import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import axios from 'axios';
import CatController from '../src/controllers/cat.controller';

jest.mock('axios');

describe('CatController', () => {
  let catController: CatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
    }).compile();

    catController = module.get<CatController>(CatController);
  });

  it('should return data from thecatapi', async () => {
    const mockResponse = {
      data: [{ id: 'cat1', url: 'cat1.jpg' }],
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await catController.create(1, {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any);
    expect(result.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(result.json).toHaveBeenCalledWith(mockResponse.data);
  });

  it('should throw HttpException on failure', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(
      catController.create(1, { status: jest.fn(), json: jest.fn() } as any),
    ).rejects.toThrow(HttpException);
  });
});
