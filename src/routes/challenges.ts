import { Router } from 'express';
import {
  renderBasicBike,
  renderBasicHike,
  renderBasicPackage,
  renderBasicRun,
  renderBikePackage,
  renderCompletePackage,
  renderHardBike,
  renderHardHike,
  renderHardPackage,
  renderHardRun,
  renderHikePackage,
  renderHobbyBike,
  renderHobbyHike,
  renderHobbyPackage,
  renderHobbyRun,
  renderRunPackage,
} from '../controllers/challenges';

export const challengesRouter = Router();

challengesRouter.get('/basic-run', renderBasicRun);

challengesRouter.get('/basic-bike', renderBasicBike);

challengesRouter.get('/basic-hike', renderBasicHike);

challengesRouter.get('/hobby-run', renderHobbyRun);

challengesRouter.get('/hobby-bike', renderHobbyBike);

challengesRouter.get('/hobby-hike', renderHobbyHike);

challengesRouter.get('/hard-run', renderHardRun);

challengesRouter.get('/hard-bike', renderHardBike);

challengesRouter.get('/hard-hike', renderHardHike);

challengesRouter.get('/run', renderRunPackage);

challengesRouter.get('/bike', renderBikePackage);

challengesRouter.get('/hike', renderHikePackage);

challengesRouter.get('/basic', renderBasicPackage);

challengesRouter.get('/hobby', renderHobbyPackage);

challengesRouter.get('/hard', renderHardPackage);

challengesRouter.get('/complete', renderCompletePackage);
