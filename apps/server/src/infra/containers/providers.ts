import { container } from 'tsyringe';
import ITokenProvider from '@providers/TokenProvider/ITokenProvider';
import JwtProvider from '@providers/TokenProvider/jwt/JwtProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', JwtProvider);
