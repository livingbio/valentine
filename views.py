#! /usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright © 2015 vagrant 
#
# Distributed under terms of the MIT license.

import webapp2
import models 
import json
import cgi

class ValentineInfo(webapp2.RequestHandler):
    def get(self, info_id):
        callback = self.request.get('callback', "")
        info = models.ValentineInfo.get_by_id(int(info_id))
        data = json.dumps(info.to_dict())

        if callback:
            template = '{callback}({data})'
        else:
            template = '{data}'
    
        self.response.write(template.format(**{"callback": callback, "data": data}))

    def post(self):
        data = {}
        data['name'] = cgi.escape(self.request.get('name'))
        data['photo'] = cgi.escape(self.request.get('photo'))
        data['who'] = cgi.escape(self.request.get('who'))
        data['commit'] = cgi.escape(self.request.get('commit'))
        data['id'] = cgi.escape(self.request.get('id'))

        info = models.ValentineInfo.create(data)
        self.response.write(json.dumps({'id': info.key.id()}))

class ValentineInfoCount(webapp2.RequestHandler):
    def get(self):
        count = models.ValentineInfo.get_count()
        self.response.write(json.dumps({'count': count}))
        
