// import request from 'supertest'
// import app from '../server/routes/handler.js'
// import router from '../server/routes/handler.js';
// registration.test.mjs (note the .mjs extension for ES modules)
// import request from 'supertest';
// import express from 'express';
// const express = require('express');
// import supertest from 'supertest';
const supertest = require('supertest');
// import { convertTo24Hour, buildStudySpacesQuery } from '../server/routes/handler.js';
const { convertTo24Hour, buildStudySpacesQuery } = require('../server/routes/handler.js');
const Schemas = require('../server/models/Schemas.js');
const app = require("../server/routes/handler.js");
const request = supertest(app);
const mongoose = require('mongoose')

it('should calculate time range correctly', () => {
    const result = convertTo24Hour('7:00', 'start');
    expect(result).toEqual("7");
    const result2 = convertTo24Hour('7:00', 'end');
    expect(result2).toEqual("6");
  });

describe('buildStudySpacesQuery', () => {
  test('should build query with building regex', () => {
    const input = { Building: 'Library', Schedule: '' };
    const result = buildStudySpacesQuery(input);

    expect(result).toEqual({
      Building: { $regex: '^.*Library.*$', $options: 'i' },
    });
  });

  test('should include Computer field if hasComputers is "on"', () => {
    const input = { hasComputers: 'on', Schedule: '' };
    const result = buildStudySpacesQuery(input);

    expect(result).toEqual({
        Building: { $regex: '^.*undefined.*$', $options: 'i' },
        Computer: 'Yes',
      });
  });

  test('should include Major field if major is "CSC"', () => {
    const input = { major: 'CSC', Schedule: '' };
    const result = buildStudySpacesQuery(input);

    expect(result).toEqual({
        Building: { $regex: '^.*undefined.*$', $options: 'i' },
        Major: 'CSC',
      });
  });

  test('should include Degree field if hasUndergraduate is "on"', () => {
    const input = { hasUndergraduate: 'on', Schedule: '' };
    const result = buildStudySpacesQuery(input);

    expect(result).toEqual({
        Building: { $regex: '^.*undefined.*$', $options: 'i' },
        Degree: 'Undergrad',
      });
  });

  test('should include Degree field if hasGraduate is "on"', () => {
    const input = { hasGraduate: 'on', Schedule: '' };
    const result = buildStudySpacesQuery(input);

    expect(result).toEqual({
        Building: { $regex: '^.*undefined.*$', $options: 'i' },
        Degree: 'Grad',
      });
  });

  test('should include WeekdayTime field if Schedule is provided', () => {
    const input = { Schedule: '9:00 AM - 5:00 PM' };
    const result = buildStudySpacesQuery(input);
  
    const [startTime24h, endTime24h] = ['9:10', '4:10'];
  
    expect(result).toEqual({
      Building: { $regex: '^.*undefined.*$', $options: 'i' },
      WeekdayTime: { $all: [`${startTime24h}`, `${endTime24h}`] },
    });
  });

  test('should handle empty Schedule', () => {
    const input = { Schedule: '' };
    const result = buildStudySpacesQuery(input);

    expect(result).toEqual({
        Building: { $regex: '^.*undefined.*$', $options: 'i' }
      });
  });
});


// await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
