import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import UserService from '../../backend/src/service/userService';
import AuthGuard from "../src/auth/auth";

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let userService: UserService;

  const mockUserService = {
    compareTokens: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    userService = module.get<UserService>(UserService);
  });

  it('should validate a user', async () => {
    mockUserService.compareTokens.mockResolvedValue(true);

    const mockContext: Partial<ExecutionContext> = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: 'Bearer token',
            'x-user-id': '1',
          },
        }),
      }),
    };

    const result = await authGuard.canActivate(mockContext as ExecutionContext);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    mockUserService.compareTokens.mockResolvedValue(false);

    const mockContext: Partial<ExecutionContext> = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: 'Bearer token',
            'x-user-id': '1',
          },
        }),
      }),
    };

    await expect(
      authGuard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow();
  });
});
