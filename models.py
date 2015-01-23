#! /usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright © 2015 vagrant 
#
# Distributed under terms of the MIT license.

from google.appengine.ext import ndb, db
from datetime import datetime, timedelta
import logging

class ValentineInfo(ndb.Model):
    name = ndb.StringProperty(indexed=False)
    photo = ndb.StringProperty(indexed=False)
    who = ndb.StringProperty(indexed=False)
    commit = ndb.StringProperty(indexed=False)
    id = ndb.StringProperty(indexed=False)

