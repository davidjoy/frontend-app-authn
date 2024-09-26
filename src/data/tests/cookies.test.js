import { getConfig } from '@openedx/frontend-base';
import Cookies from 'universal-cookie';

import { setCookie } from '../utils';

// Mock getConfig function
jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  getConfig: jest.fn(),
}));

// Mock Cookies class
jest.mock('universal-cookie');

describe('setCookie function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set a cookie with default options', () => {
    getConfig.mockReturnValue({ SESSION_COOKIE_DOMAIN: 'example.com' });

    setCookie('testCookie', 'testValue');

    expect(Cookies).toHaveBeenCalled();
    expect(Cookies).toHaveBeenCalledWith();
    expect(Cookies.prototype.set).toHaveBeenCalledWith('testCookie', 'testValue', {
      domain: 'example.com',
      path: '/',
    });
  });

  it('should set a cookie with specified expiry', () => {
    getConfig.mockReturnValue({ SESSION_COOKIE_DOMAIN: 'example.com' });

    const expiry = new Date('2023-12-31');
    setCookie('testCookie', 'testValue', expiry);

    expect(Cookies).toHaveBeenCalled();
    expect(Cookies).toHaveBeenCalledWith();
    expect(Cookies.prototype.set).toHaveBeenCalledWith('testCookie', 'testValue', {
      domain: 'example.com',
      path: '/',
      expires: expiry,
    });
  });

  it('should not set a cookie if cookieName is undefined', () => {
    setCookie(undefined, 'testValue');

    expect(Cookies).not.toHaveBeenCalled();
  });
});
