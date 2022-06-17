import ITokenProvider from '@providers/TokenProvider/ITokenProvider';
import JwtProvider from '@providers/TokenProvider/jwt/JwtProvider';
import { container } from 'tsyringe';

container.registerSingleton<ITokenProvider>('TokenProvider', JwtProvider);
