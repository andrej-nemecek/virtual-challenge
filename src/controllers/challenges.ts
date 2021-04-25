import { RequestHandler } from 'express';

export const renderBasicRun: RequestHandler = (req, res) => {
  res.render('challenges/basic-run');
};

export const renderBasicBike: RequestHandler = (req, res) => {
  res.render('challenges/basic-bike');
};

export const renderBasicHike: RequestHandler = (req, res) => {
  res.render('challenges/basic-hike');
};

export const renderHobbyRun: RequestHandler = (req, res) => {
  res.render('challenges/hobby-run');
};

export const renderHobbyBike: RequestHandler = (req, res) => {
  res.render('challenges/hobby-bike');
};

export const renderHobbyHike: RequestHandler = (req, res) => {
  res.render('challenges/hobby-hike');
};

export const renderHardRun: RequestHandler = (req, res) => {
  res.render('challenges/hard-run');
};

export const renderHardBike: RequestHandler = (req, res) => {
  res.render('challenges/hard-bike');
};

export const renderHardHike: RequestHandler = (req, res) => {
  res.render('challenges/hard-hike');
};

export const renderBasicPackage: RequestHandler = (req, res) => {
  res.render('challenges/basic');
};

export const renderHobbyPackage: RequestHandler = (req, res) => {
  res.render('challenges/hobby');
};

export const renderHardPackage: RequestHandler = (req, res) => {
  res.render('challenges/hard');
};

export const renderRunPackage: RequestHandler = (req, res) => {
  res.render('challenges/run');
};

export const renderBikePackage: RequestHandler = (req, res) => {
  res.render('challenges/bike');
};

export const renderHikePackage: RequestHandler = (req, res) => {
  res.render('challenges/hike');
};

export const renderCompletePackage: RequestHandler = (req, res) => {
  res.render('challenges/complete');
};
