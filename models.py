#! /usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright © 2015 vagrant 
#
# Distributed under terms of the MIT license.

from google.appengine.ext import ndb, db
from datetime import datetime, timedelta
import logging
import random
from google.appengine.ext import ndb


class ValentineInfo(ndb.Model):
    name = ndb.StringProperty(indexed=False)
    photo = ndb.StringProperty(indexed=False)
    who = ndb.StringProperty(indexed=False)
    commit = ndb.StringProperty(indexed=False)
    id = ndb.StringProperty(indexed=False)
    
    @classmethod
    def create(cls, data):
        ValentineInfoCounter.increment()
        instance = cls(**data)
        instance.put()
        return instance

        
    @classmethod
    def get_count(cls):
        return ValentineInfoCounter.get_count()


class ValentineInfoCounter(ndb.Model):
    """Shards for the counter"""
    count = ndb.IntegerProperty(default=0)
    num_shards = 20

    @classmethod
    def get_count(cls):
        total = 0
        for counter in cls.query():
            total += counter.count
        return total


    @classmethod
    @ndb.transactional
    def increment(cls):
        """Increment the value for a given sharded counter."""
        shard_string_index = str(random.randint(0, cls.num_shards - 1))
        counter = cls.get_by_id(shard_string_index)
        if counter is None:
            counter = cls(id=shard_string_index)
        counter.count += 1
        counter.put()

