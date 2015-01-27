#! /usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright © 2015 vagrant 
#
# Distributed under terms of the MIT license.

import webapp2
import sys
import logging
import os
import views

app = webapp2.WSGIApplication([
    (r'/valentine/api/valentineinfo', views.ValentineInfo),
    (r'/valentine/api/valentineinfo/(\d+)', views.ValentineInfo),
    (r'/valentine/api/valentinecount', views.ValentineInfoCount),
], debug=False)


app.error_handlers[404] = lambda *args, **kwargs: webapp2.Response('404')
