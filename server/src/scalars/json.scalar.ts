// json.scalar.ts
import { Scalar, CustomScalar } from '@nestjs/graphql';
import * as GraphQLJSON from 'graphql-type-json';

// @Scalar('JSON', type => Object)
// export class JsonScalar implements CustomScalar<string, any> {
//   // name = GraphQLJSON.name;
//   // description = GraphQLJSON.description;

//   // serialize = GraphQLJSON.serialize;
//   // parseValue = GraphQLJSON.parseValue;
//   // parseLiteral = GraphQLJSON.parseLiteral;
// }