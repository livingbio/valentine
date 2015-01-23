#! /usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright © 2015 vagrant 
#
# Distributed under terms of the MIT license.

import webapp2
import models 
import json

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
        data['name'] = self.request.get('name')
        data['photo'] = self.request.get('photo')
        data['who'] = self.request.get('who')
        data['commit'] = self.request.get('commit')
        info = models.ValentineInfo(**data)
        info.put()
        self.response.write(json.dumps({'id': info.key.id()}))
