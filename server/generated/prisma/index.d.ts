
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model StravaAccessToken
 * 
 */
export type StravaAccessToken = $Result.DefaultSelection<Prisma.$StravaAccessTokenPayload>
/**
 * Model StravaRefreshToken
 * 
 */
export type StravaRefreshToken = $Result.DefaultSelection<Prisma.$StravaRefreshTokenPayload>
/**
 * Model StravaActivity
 * 
 */
export type StravaActivity = $Result.DefaultSelection<Prisma.$StravaActivityPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more StravaAccessTokens
 * const stravaAccessTokens = await prisma.stravaAccessToken.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more StravaAccessTokens
   * const stravaAccessTokens = await prisma.stravaAccessToken.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.stravaAccessToken`: Exposes CRUD operations for the **StravaAccessToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StravaAccessTokens
    * const stravaAccessTokens = await prisma.stravaAccessToken.findMany()
    * ```
    */
  get stravaAccessToken(): Prisma.StravaAccessTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stravaRefreshToken`: Exposes CRUD operations for the **StravaRefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StravaRefreshTokens
    * const stravaRefreshTokens = await prisma.stravaRefreshToken.findMany()
    * ```
    */
  get stravaRefreshToken(): Prisma.StravaRefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stravaActivity`: Exposes CRUD operations for the **StravaActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StravaActivities
    * const stravaActivities = await prisma.stravaActivity.findMany()
    * ```
    */
  get stravaActivity(): Prisma.StravaActivityDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    StravaAccessToken: 'StravaAccessToken',
    StravaRefreshToken: 'StravaRefreshToken',
    StravaActivity: 'StravaActivity'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "stravaAccessToken" | "stravaRefreshToken" | "stravaActivity"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      StravaAccessToken: {
        payload: Prisma.$StravaAccessTokenPayload<ExtArgs>
        fields: Prisma.StravaAccessTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StravaAccessTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StravaAccessTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload>
          }
          findFirst: {
            args: Prisma.StravaAccessTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StravaAccessTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload>
          }
          findMany: {
            args: Prisma.StravaAccessTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload>[]
          }
          create: {
            args: Prisma.StravaAccessTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload>
          }
          createMany: {
            args: Prisma.StravaAccessTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StravaAccessTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload>[]
          }
          delete: {
            args: Prisma.StravaAccessTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload>
          }
          update: {
            args: Prisma.StravaAccessTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload>
          }
          deleteMany: {
            args: Prisma.StravaAccessTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StravaAccessTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StravaAccessTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload>[]
          }
          upsert: {
            args: Prisma.StravaAccessTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaAccessTokenPayload>
          }
          aggregate: {
            args: Prisma.StravaAccessTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStravaAccessToken>
          }
          groupBy: {
            args: Prisma.StravaAccessTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<StravaAccessTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.StravaAccessTokenCountArgs<ExtArgs>
            result: $Utils.Optional<StravaAccessTokenCountAggregateOutputType> | number
          }
        }
      }
      StravaRefreshToken: {
        payload: Prisma.$StravaRefreshTokenPayload<ExtArgs>
        fields: Prisma.StravaRefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StravaRefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StravaRefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.StravaRefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StravaRefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload>
          }
          findMany: {
            args: Prisma.StravaRefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload>[]
          }
          create: {
            args: Prisma.StravaRefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload>
          }
          createMany: {
            args: Prisma.StravaRefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StravaRefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.StravaRefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload>
          }
          update: {
            args: Prisma.StravaRefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.StravaRefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StravaRefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StravaRefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.StravaRefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaRefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.StravaRefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStravaRefreshToken>
          }
          groupBy: {
            args: Prisma.StravaRefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<StravaRefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.StravaRefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<StravaRefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      StravaActivity: {
        payload: Prisma.$StravaActivityPayload<ExtArgs>
        fields: Prisma.StravaActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StravaActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StravaActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload>
          }
          findFirst: {
            args: Prisma.StravaActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StravaActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload>
          }
          findMany: {
            args: Prisma.StravaActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload>[]
          }
          create: {
            args: Prisma.StravaActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload>
          }
          createMany: {
            args: Prisma.StravaActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StravaActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload>[]
          }
          delete: {
            args: Prisma.StravaActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload>
          }
          update: {
            args: Prisma.StravaActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload>
          }
          deleteMany: {
            args: Prisma.StravaActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StravaActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StravaActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload>[]
          }
          upsert: {
            args: Prisma.StravaActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StravaActivityPayload>
          }
          aggregate: {
            args: Prisma.StravaActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStravaActivity>
          }
          groupBy: {
            args: Prisma.StravaActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<StravaActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.StravaActivityCountArgs<ExtArgs>
            result: $Utils.Optional<StravaActivityCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    stravaAccessToken?: StravaAccessTokenOmit
    stravaRefreshToken?: StravaRefreshTokenOmit
    stravaActivity?: StravaActivityOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model StravaAccessToken
   */

  export type AggregateStravaAccessToken = {
    _count: StravaAccessTokenCountAggregateOutputType | null
    _avg: StravaAccessTokenAvgAggregateOutputType | null
    _sum: StravaAccessTokenSumAggregateOutputType | null
    _min: StravaAccessTokenMinAggregateOutputType | null
    _max: StravaAccessTokenMaxAggregateOutputType | null
  }

  export type StravaAccessTokenAvgAggregateOutputType = {
    athleteId: number | null
    expiresAt: number | null
  }

  export type StravaAccessTokenSumAggregateOutputType = {
    athleteId: number | null
    expiresAt: bigint | null
  }

  export type StravaAccessTokenMinAggregateOutputType = {
    athleteId: number | null
    tokenCode: string | null
    scope: string | null
    expiresAt: bigint | null
  }

  export type StravaAccessTokenMaxAggregateOutputType = {
    athleteId: number | null
    tokenCode: string | null
    scope: string | null
    expiresAt: bigint | null
  }

  export type StravaAccessTokenCountAggregateOutputType = {
    athleteId: number
    tokenCode: number
    scope: number
    expiresAt: number
    _all: number
  }


  export type StravaAccessTokenAvgAggregateInputType = {
    athleteId?: true
    expiresAt?: true
  }

  export type StravaAccessTokenSumAggregateInputType = {
    athleteId?: true
    expiresAt?: true
  }

  export type StravaAccessTokenMinAggregateInputType = {
    athleteId?: true
    tokenCode?: true
    scope?: true
    expiresAt?: true
  }

  export type StravaAccessTokenMaxAggregateInputType = {
    athleteId?: true
    tokenCode?: true
    scope?: true
    expiresAt?: true
  }

  export type StravaAccessTokenCountAggregateInputType = {
    athleteId?: true
    tokenCode?: true
    scope?: true
    expiresAt?: true
    _all?: true
  }

  export type StravaAccessTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StravaAccessToken to aggregate.
     */
    where?: StravaAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaAccessTokens to fetch.
     */
    orderBy?: StravaAccessTokenOrderByWithRelationInput | StravaAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StravaAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StravaAccessTokens
    **/
    _count?: true | StravaAccessTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StravaAccessTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StravaAccessTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StravaAccessTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StravaAccessTokenMaxAggregateInputType
  }

  export type GetStravaAccessTokenAggregateType<T extends StravaAccessTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateStravaAccessToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStravaAccessToken[P]>
      : GetScalarType<T[P], AggregateStravaAccessToken[P]>
  }




  export type StravaAccessTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StravaAccessTokenWhereInput
    orderBy?: StravaAccessTokenOrderByWithAggregationInput | StravaAccessTokenOrderByWithAggregationInput[]
    by: StravaAccessTokenScalarFieldEnum[] | StravaAccessTokenScalarFieldEnum
    having?: StravaAccessTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StravaAccessTokenCountAggregateInputType | true
    _avg?: StravaAccessTokenAvgAggregateInputType
    _sum?: StravaAccessTokenSumAggregateInputType
    _min?: StravaAccessTokenMinAggregateInputType
    _max?: StravaAccessTokenMaxAggregateInputType
  }

  export type StravaAccessTokenGroupByOutputType = {
    athleteId: number
    tokenCode: string
    scope: string
    expiresAt: bigint
    _count: StravaAccessTokenCountAggregateOutputType | null
    _avg: StravaAccessTokenAvgAggregateOutputType | null
    _sum: StravaAccessTokenSumAggregateOutputType | null
    _min: StravaAccessTokenMinAggregateOutputType | null
    _max: StravaAccessTokenMaxAggregateOutputType | null
  }

  type GetStravaAccessTokenGroupByPayload<T extends StravaAccessTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StravaAccessTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StravaAccessTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StravaAccessTokenGroupByOutputType[P]>
            : GetScalarType<T[P], StravaAccessTokenGroupByOutputType[P]>
        }
      >
    >


  export type StravaAccessTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    athleteId?: boolean
    tokenCode?: boolean
    scope?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["stravaAccessToken"]>

  export type StravaAccessTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    athleteId?: boolean
    tokenCode?: boolean
    scope?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["stravaAccessToken"]>

  export type StravaAccessTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    athleteId?: boolean
    tokenCode?: boolean
    scope?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["stravaAccessToken"]>

  export type StravaAccessTokenSelectScalar = {
    athleteId?: boolean
    tokenCode?: boolean
    scope?: boolean
    expiresAt?: boolean
  }

  export type StravaAccessTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"athleteId" | "tokenCode" | "scope" | "expiresAt", ExtArgs["result"]["stravaAccessToken"]>

  export type $StravaAccessTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StravaAccessToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      athleteId: number
      tokenCode: string
      scope: string
      expiresAt: bigint
    }, ExtArgs["result"]["stravaAccessToken"]>
    composites: {}
  }

  type StravaAccessTokenGetPayload<S extends boolean | null | undefined | StravaAccessTokenDefaultArgs> = $Result.GetResult<Prisma.$StravaAccessTokenPayload, S>

  type StravaAccessTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StravaAccessTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StravaAccessTokenCountAggregateInputType | true
    }

  export interface StravaAccessTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StravaAccessToken'], meta: { name: 'StravaAccessToken' } }
    /**
     * Find zero or one StravaAccessToken that matches the filter.
     * @param {StravaAccessTokenFindUniqueArgs} args - Arguments to find a StravaAccessToken
     * @example
     * // Get one StravaAccessToken
     * const stravaAccessToken = await prisma.stravaAccessToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StravaAccessTokenFindUniqueArgs>(args: SelectSubset<T, StravaAccessTokenFindUniqueArgs<ExtArgs>>): Prisma__StravaAccessTokenClient<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StravaAccessToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StravaAccessTokenFindUniqueOrThrowArgs} args - Arguments to find a StravaAccessToken
     * @example
     * // Get one StravaAccessToken
     * const stravaAccessToken = await prisma.stravaAccessToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StravaAccessTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, StravaAccessTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StravaAccessTokenClient<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StravaAccessToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaAccessTokenFindFirstArgs} args - Arguments to find a StravaAccessToken
     * @example
     * // Get one StravaAccessToken
     * const stravaAccessToken = await prisma.stravaAccessToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StravaAccessTokenFindFirstArgs>(args?: SelectSubset<T, StravaAccessTokenFindFirstArgs<ExtArgs>>): Prisma__StravaAccessTokenClient<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StravaAccessToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaAccessTokenFindFirstOrThrowArgs} args - Arguments to find a StravaAccessToken
     * @example
     * // Get one StravaAccessToken
     * const stravaAccessToken = await prisma.stravaAccessToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StravaAccessTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, StravaAccessTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__StravaAccessTokenClient<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StravaAccessTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaAccessTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StravaAccessTokens
     * const stravaAccessTokens = await prisma.stravaAccessToken.findMany()
     * 
     * // Get first 10 StravaAccessTokens
     * const stravaAccessTokens = await prisma.stravaAccessToken.findMany({ take: 10 })
     * 
     * // Only select the `athleteId`
     * const stravaAccessTokenWithAthleteIdOnly = await prisma.stravaAccessToken.findMany({ select: { athleteId: true } })
     * 
     */
    findMany<T extends StravaAccessTokenFindManyArgs>(args?: SelectSubset<T, StravaAccessTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StravaAccessToken.
     * @param {StravaAccessTokenCreateArgs} args - Arguments to create a StravaAccessToken.
     * @example
     * // Create one StravaAccessToken
     * const StravaAccessToken = await prisma.stravaAccessToken.create({
     *   data: {
     *     // ... data to create a StravaAccessToken
     *   }
     * })
     * 
     */
    create<T extends StravaAccessTokenCreateArgs>(args: SelectSubset<T, StravaAccessTokenCreateArgs<ExtArgs>>): Prisma__StravaAccessTokenClient<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StravaAccessTokens.
     * @param {StravaAccessTokenCreateManyArgs} args - Arguments to create many StravaAccessTokens.
     * @example
     * // Create many StravaAccessTokens
     * const stravaAccessToken = await prisma.stravaAccessToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StravaAccessTokenCreateManyArgs>(args?: SelectSubset<T, StravaAccessTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StravaAccessTokens and returns the data saved in the database.
     * @param {StravaAccessTokenCreateManyAndReturnArgs} args - Arguments to create many StravaAccessTokens.
     * @example
     * // Create many StravaAccessTokens
     * const stravaAccessToken = await prisma.stravaAccessToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StravaAccessTokens and only return the `athleteId`
     * const stravaAccessTokenWithAthleteIdOnly = await prisma.stravaAccessToken.createManyAndReturn({
     *   select: { athleteId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StravaAccessTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, StravaAccessTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StravaAccessToken.
     * @param {StravaAccessTokenDeleteArgs} args - Arguments to delete one StravaAccessToken.
     * @example
     * // Delete one StravaAccessToken
     * const StravaAccessToken = await prisma.stravaAccessToken.delete({
     *   where: {
     *     // ... filter to delete one StravaAccessToken
     *   }
     * })
     * 
     */
    delete<T extends StravaAccessTokenDeleteArgs>(args: SelectSubset<T, StravaAccessTokenDeleteArgs<ExtArgs>>): Prisma__StravaAccessTokenClient<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StravaAccessToken.
     * @param {StravaAccessTokenUpdateArgs} args - Arguments to update one StravaAccessToken.
     * @example
     * // Update one StravaAccessToken
     * const stravaAccessToken = await prisma.stravaAccessToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StravaAccessTokenUpdateArgs>(args: SelectSubset<T, StravaAccessTokenUpdateArgs<ExtArgs>>): Prisma__StravaAccessTokenClient<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StravaAccessTokens.
     * @param {StravaAccessTokenDeleteManyArgs} args - Arguments to filter StravaAccessTokens to delete.
     * @example
     * // Delete a few StravaAccessTokens
     * const { count } = await prisma.stravaAccessToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StravaAccessTokenDeleteManyArgs>(args?: SelectSubset<T, StravaAccessTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StravaAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaAccessTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StravaAccessTokens
     * const stravaAccessToken = await prisma.stravaAccessToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StravaAccessTokenUpdateManyArgs>(args: SelectSubset<T, StravaAccessTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StravaAccessTokens and returns the data updated in the database.
     * @param {StravaAccessTokenUpdateManyAndReturnArgs} args - Arguments to update many StravaAccessTokens.
     * @example
     * // Update many StravaAccessTokens
     * const stravaAccessToken = await prisma.stravaAccessToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StravaAccessTokens and only return the `athleteId`
     * const stravaAccessTokenWithAthleteIdOnly = await prisma.stravaAccessToken.updateManyAndReturn({
     *   select: { athleteId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StravaAccessTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, StravaAccessTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StravaAccessToken.
     * @param {StravaAccessTokenUpsertArgs} args - Arguments to update or create a StravaAccessToken.
     * @example
     * // Update or create a StravaAccessToken
     * const stravaAccessToken = await prisma.stravaAccessToken.upsert({
     *   create: {
     *     // ... data to create a StravaAccessToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StravaAccessToken we want to update
     *   }
     * })
     */
    upsert<T extends StravaAccessTokenUpsertArgs>(args: SelectSubset<T, StravaAccessTokenUpsertArgs<ExtArgs>>): Prisma__StravaAccessTokenClient<$Result.GetResult<Prisma.$StravaAccessTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StravaAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaAccessTokenCountArgs} args - Arguments to filter StravaAccessTokens to count.
     * @example
     * // Count the number of StravaAccessTokens
     * const count = await prisma.stravaAccessToken.count({
     *   where: {
     *     // ... the filter for the StravaAccessTokens we want to count
     *   }
     * })
    **/
    count<T extends StravaAccessTokenCountArgs>(
      args?: Subset<T, StravaAccessTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StravaAccessTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StravaAccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaAccessTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StravaAccessTokenAggregateArgs>(args: Subset<T, StravaAccessTokenAggregateArgs>): Prisma.PrismaPromise<GetStravaAccessTokenAggregateType<T>>

    /**
     * Group by StravaAccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaAccessTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StravaAccessTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StravaAccessTokenGroupByArgs['orderBy'] }
        : { orderBy?: StravaAccessTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StravaAccessTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStravaAccessTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StravaAccessToken model
   */
  readonly fields: StravaAccessTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StravaAccessToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StravaAccessTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StravaAccessToken model
   */
  interface StravaAccessTokenFieldRefs {
    readonly athleteId: FieldRef<"StravaAccessToken", 'Int'>
    readonly tokenCode: FieldRef<"StravaAccessToken", 'String'>
    readonly scope: FieldRef<"StravaAccessToken", 'String'>
    readonly expiresAt: FieldRef<"StravaAccessToken", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * StravaAccessToken findUnique
   */
  export type StravaAccessTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * Filter, which StravaAccessToken to fetch.
     */
    where: StravaAccessTokenWhereUniqueInput
  }

  /**
   * StravaAccessToken findUniqueOrThrow
   */
  export type StravaAccessTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * Filter, which StravaAccessToken to fetch.
     */
    where: StravaAccessTokenWhereUniqueInput
  }

  /**
   * StravaAccessToken findFirst
   */
  export type StravaAccessTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * Filter, which StravaAccessToken to fetch.
     */
    where?: StravaAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaAccessTokens to fetch.
     */
    orderBy?: StravaAccessTokenOrderByWithRelationInput | StravaAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StravaAccessTokens.
     */
    cursor?: StravaAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StravaAccessTokens.
     */
    distinct?: StravaAccessTokenScalarFieldEnum | StravaAccessTokenScalarFieldEnum[]
  }

  /**
   * StravaAccessToken findFirstOrThrow
   */
  export type StravaAccessTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * Filter, which StravaAccessToken to fetch.
     */
    where?: StravaAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaAccessTokens to fetch.
     */
    orderBy?: StravaAccessTokenOrderByWithRelationInput | StravaAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StravaAccessTokens.
     */
    cursor?: StravaAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StravaAccessTokens.
     */
    distinct?: StravaAccessTokenScalarFieldEnum | StravaAccessTokenScalarFieldEnum[]
  }

  /**
   * StravaAccessToken findMany
   */
  export type StravaAccessTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * Filter, which StravaAccessTokens to fetch.
     */
    where?: StravaAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaAccessTokens to fetch.
     */
    orderBy?: StravaAccessTokenOrderByWithRelationInput | StravaAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StravaAccessTokens.
     */
    cursor?: StravaAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaAccessTokens.
     */
    skip?: number
    distinct?: StravaAccessTokenScalarFieldEnum | StravaAccessTokenScalarFieldEnum[]
  }

  /**
   * StravaAccessToken create
   */
  export type StravaAccessTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a StravaAccessToken.
     */
    data: XOR<StravaAccessTokenCreateInput, StravaAccessTokenUncheckedCreateInput>
  }

  /**
   * StravaAccessToken createMany
   */
  export type StravaAccessTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StravaAccessTokens.
     */
    data: StravaAccessTokenCreateManyInput | StravaAccessTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StravaAccessToken createManyAndReturn
   */
  export type StravaAccessTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * The data used to create many StravaAccessTokens.
     */
    data: StravaAccessTokenCreateManyInput | StravaAccessTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StravaAccessToken update
   */
  export type StravaAccessTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a StravaAccessToken.
     */
    data: XOR<StravaAccessTokenUpdateInput, StravaAccessTokenUncheckedUpdateInput>
    /**
     * Choose, which StravaAccessToken to update.
     */
    where: StravaAccessTokenWhereUniqueInput
  }

  /**
   * StravaAccessToken updateMany
   */
  export type StravaAccessTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StravaAccessTokens.
     */
    data: XOR<StravaAccessTokenUpdateManyMutationInput, StravaAccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which StravaAccessTokens to update
     */
    where?: StravaAccessTokenWhereInput
    /**
     * Limit how many StravaAccessTokens to update.
     */
    limit?: number
  }

  /**
   * StravaAccessToken updateManyAndReturn
   */
  export type StravaAccessTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * The data used to update StravaAccessTokens.
     */
    data: XOR<StravaAccessTokenUpdateManyMutationInput, StravaAccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which StravaAccessTokens to update
     */
    where?: StravaAccessTokenWhereInput
    /**
     * Limit how many StravaAccessTokens to update.
     */
    limit?: number
  }

  /**
   * StravaAccessToken upsert
   */
  export type StravaAccessTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the StravaAccessToken to update in case it exists.
     */
    where: StravaAccessTokenWhereUniqueInput
    /**
     * In case the StravaAccessToken found by the `where` argument doesn't exist, create a new StravaAccessToken with this data.
     */
    create: XOR<StravaAccessTokenCreateInput, StravaAccessTokenUncheckedCreateInput>
    /**
     * In case the StravaAccessToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StravaAccessTokenUpdateInput, StravaAccessTokenUncheckedUpdateInput>
  }

  /**
   * StravaAccessToken delete
   */
  export type StravaAccessTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
    /**
     * Filter which StravaAccessToken to delete.
     */
    where: StravaAccessTokenWhereUniqueInput
  }

  /**
   * StravaAccessToken deleteMany
   */
  export type StravaAccessTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StravaAccessTokens to delete
     */
    where?: StravaAccessTokenWhereInput
    /**
     * Limit how many StravaAccessTokens to delete.
     */
    limit?: number
  }

  /**
   * StravaAccessToken without action
   */
  export type StravaAccessTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaAccessToken
     */
    select?: StravaAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaAccessToken
     */
    omit?: StravaAccessTokenOmit<ExtArgs> | null
  }


  /**
   * Model StravaRefreshToken
   */

  export type AggregateStravaRefreshToken = {
    _count: StravaRefreshTokenCountAggregateOutputType | null
    _avg: StravaRefreshTokenAvgAggregateOutputType | null
    _sum: StravaRefreshTokenSumAggregateOutputType | null
    _min: StravaRefreshTokenMinAggregateOutputType | null
    _max: StravaRefreshTokenMaxAggregateOutputType | null
  }

  export type StravaRefreshTokenAvgAggregateOutputType = {
    athleteId: number | null
  }

  export type StravaRefreshTokenSumAggregateOutputType = {
    athleteId: number | null
  }

  export type StravaRefreshTokenMinAggregateOutputType = {
    athleteId: number | null
    tokenCode: string | null
    scope: string | null
  }

  export type StravaRefreshTokenMaxAggregateOutputType = {
    athleteId: number | null
    tokenCode: string | null
    scope: string | null
  }

  export type StravaRefreshTokenCountAggregateOutputType = {
    athleteId: number
    tokenCode: number
    scope: number
    _all: number
  }


  export type StravaRefreshTokenAvgAggregateInputType = {
    athleteId?: true
  }

  export type StravaRefreshTokenSumAggregateInputType = {
    athleteId?: true
  }

  export type StravaRefreshTokenMinAggregateInputType = {
    athleteId?: true
    tokenCode?: true
    scope?: true
  }

  export type StravaRefreshTokenMaxAggregateInputType = {
    athleteId?: true
    tokenCode?: true
    scope?: true
  }

  export type StravaRefreshTokenCountAggregateInputType = {
    athleteId?: true
    tokenCode?: true
    scope?: true
    _all?: true
  }

  export type StravaRefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StravaRefreshToken to aggregate.
     */
    where?: StravaRefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaRefreshTokens to fetch.
     */
    orderBy?: StravaRefreshTokenOrderByWithRelationInput | StravaRefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StravaRefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaRefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaRefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StravaRefreshTokens
    **/
    _count?: true | StravaRefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StravaRefreshTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StravaRefreshTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StravaRefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StravaRefreshTokenMaxAggregateInputType
  }

  export type GetStravaRefreshTokenAggregateType<T extends StravaRefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateStravaRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStravaRefreshToken[P]>
      : GetScalarType<T[P], AggregateStravaRefreshToken[P]>
  }




  export type StravaRefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StravaRefreshTokenWhereInput
    orderBy?: StravaRefreshTokenOrderByWithAggregationInput | StravaRefreshTokenOrderByWithAggregationInput[]
    by: StravaRefreshTokenScalarFieldEnum[] | StravaRefreshTokenScalarFieldEnum
    having?: StravaRefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StravaRefreshTokenCountAggregateInputType | true
    _avg?: StravaRefreshTokenAvgAggregateInputType
    _sum?: StravaRefreshTokenSumAggregateInputType
    _min?: StravaRefreshTokenMinAggregateInputType
    _max?: StravaRefreshTokenMaxAggregateInputType
  }

  export type StravaRefreshTokenGroupByOutputType = {
    athleteId: number
    tokenCode: string
    scope: string
    _count: StravaRefreshTokenCountAggregateOutputType | null
    _avg: StravaRefreshTokenAvgAggregateOutputType | null
    _sum: StravaRefreshTokenSumAggregateOutputType | null
    _min: StravaRefreshTokenMinAggregateOutputType | null
    _max: StravaRefreshTokenMaxAggregateOutputType | null
  }

  type GetStravaRefreshTokenGroupByPayload<T extends StravaRefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StravaRefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StravaRefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StravaRefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], StravaRefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type StravaRefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    athleteId?: boolean
    tokenCode?: boolean
    scope?: boolean
  }, ExtArgs["result"]["stravaRefreshToken"]>

  export type StravaRefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    athleteId?: boolean
    tokenCode?: boolean
    scope?: boolean
  }, ExtArgs["result"]["stravaRefreshToken"]>

  export type StravaRefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    athleteId?: boolean
    tokenCode?: boolean
    scope?: boolean
  }, ExtArgs["result"]["stravaRefreshToken"]>

  export type StravaRefreshTokenSelectScalar = {
    athleteId?: boolean
    tokenCode?: boolean
    scope?: boolean
  }

  export type StravaRefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"athleteId" | "tokenCode" | "scope", ExtArgs["result"]["stravaRefreshToken"]>

  export type $StravaRefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StravaRefreshToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      athleteId: number
      tokenCode: string
      scope: string
    }, ExtArgs["result"]["stravaRefreshToken"]>
    composites: {}
  }

  type StravaRefreshTokenGetPayload<S extends boolean | null | undefined | StravaRefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$StravaRefreshTokenPayload, S>

  type StravaRefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StravaRefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StravaRefreshTokenCountAggregateInputType | true
    }

  export interface StravaRefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StravaRefreshToken'], meta: { name: 'StravaRefreshToken' } }
    /**
     * Find zero or one StravaRefreshToken that matches the filter.
     * @param {StravaRefreshTokenFindUniqueArgs} args - Arguments to find a StravaRefreshToken
     * @example
     * // Get one StravaRefreshToken
     * const stravaRefreshToken = await prisma.stravaRefreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StravaRefreshTokenFindUniqueArgs>(args: SelectSubset<T, StravaRefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__StravaRefreshTokenClient<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StravaRefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StravaRefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a StravaRefreshToken
     * @example
     * // Get one StravaRefreshToken
     * const stravaRefreshToken = await prisma.stravaRefreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StravaRefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, StravaRefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StravaRefreshTokenClient<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StravaRefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaRefreshTokenFindFirstArgs} args - Arguments to find a StravaRefreshToken
     * @example
     * // Get one StravaRefreshToken
     * const stravaRefreshToken = await prisma.stravaRefreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StravaRefreshTokenFindFirstArgs>(args?: SelectSubset<T, StravaRefreshTokenFindFirstArgs<ExtArgs>>): Prisma__StravaRefreshTokenClient<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StravaRefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaRefreshTokenFindFirstOrThrowArgs} args - Arguments to find a StravaRefreshToken
     * @example
     * // Get one StravaRefreshToken
     * const stravaRefreshToken = await prisma.stravaRefreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StravaRefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, StravaRefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__StravaRefreshTokenClient<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StravaRefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaRefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StravaRefreshTokens
     * const stravaRefreshTokens = await prisma.stravaRefreshToken.findMany()
     * 
     * // Get first 10 StravaRefreshTokens
     * const stravaRefreshTokens = await prisma.stravaRefreshToken.findMany({ take: 10 })
     * 
     * // Only select the `athleteId`
     * const stravaRefreshTokenWithAthleteIdOnly = await prisma.stravaRefreshToken.findMany({ select: { athleteId: true } })
     * 
     */
    findMany<T extends StravaRefreshTokenFindManyArgs>(args?: SelectSubset<T, StravaRefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StravaRefreshToken.
     * @param {StravaRefreshTokenCreateArgs} args - Arguments to create a StravaRefreshToken.
     * @example
     * // Create one StravaRefreshToken
     * const StravaRefreshToken = await prisma.stravaRefreshToken.create({
     *   data: {
     *     // ... data to create a StravaRefreshToken
     *   }
     * })
     * 
     */
    create<T extends StravaRefreshTokenCreateArgs>(args: SelectSubset<T, StravaRefreshTokenCreateArgs<ExtArgs>>): Prisma__StravaRefreshTokenClient<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StravaRefreshTokens.
     * @param {StravaRefreshTokenCreateManyArgs} args - Arguments to create many StravaRefreshTokens.
     * @example
     * // Create many StravaRefreshTokens
     * const stravaRefreshToken = await prisma.stravaRefreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StravaRefreshTokenCreateManyArgs>(args?: SelectSubset<T, StravaRefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StravaRefreshTokens and returns the data saved in the database.
     * @param {StravaRefreshTokenCreateManyAndReturnArgs} args - Arguments to create many StravaRefreshTokens.
     * @example
     * // Create many StravaRefreshTokens
     * const stravaRefreshToken = await prisma.stravaRefreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StravaRefreshTokens and only return the `athleteId`
     * const stravaRefreshTokenWithAthleteIdOnly = await prisma.stravaRefreshToken.createManyAndReturn({
     *   select: { athleteId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StravaRefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, StravaRefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StravaRefreshToken.
     * @param {StravaRefreshTokenDeleteArgs} args - Arguments to delete one StravaRefreshToken.
     * @example
     * // Delete one StravaRefreshToken
     * const StravaRefreshToken = await prisma.stravaRefreshToken.delete({
     *   where: {
     *     // ... filter to delete one StravaRefreshToken
     *   }
     * })
     * 
     */
    delete<T extends StravaRefreshTokenDeleteArgs>(args: SelectSubset<T, StravaRefreshTokenDeleteArgs<ExtArgs>>): Prisma__StravaRefreshTokenClient<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StravaRefreshToken.
     * @param {StravaRefreshTokenUpdateArgs} args - Arguments to update one StravaRefreshToken.
     * @example
     * // Update one StravaRefreshToken
     * const stravaRefreshToken = await prisma.stravaRefreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StravaRefreshTokenUpdateArgs>(args: SelectSubset<T, StravaRefreshTokenUpdateArgs<ExtArgs>>): Prisma__StravaRefreshTokenClient<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StravaRefreshTokens.
     * @param {StravaRefreshTokenDeleteManyArgs} args - Arguments to filter StravaRefreshTokens to delete.
     * @example
     * // Delete a few StravaRefreshTokens
     * const { count } = await prisma.stravaRefreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StravaRefreshTokenDeleteManyArgs>(args?: SelectSubset<T, StravaRefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StravaRefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaRefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StravaRefreshTokens
     * const stravaRefreshToken = await prisma.stravaRefreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StravaRefreshTokenUpdateManyArgs>(args: SelectSubset<T, StravaRefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StravaRefreshTokens and returns the data updated in the database.
     * @param {StravaRefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many StravaRefreshTokens.
     * @example
     * // Update many StravaRefreshTokens
     * const stravaRefreshToken = await prisma.stravaRefreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StravaRefreshTokens and only return the `athleteId`
     * const stravaRefreshTokenWithAthleteIdOnly = await prisma.stravaRefreshToken.updateManyAndReturn({
     *   select: { athleteId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StravaRefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, StravaRefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StravaRefreshToken.
     * @param {StravaRefreshTokenUpsertArgs} args - Arguments to update or create a StravaRefreshToken.
     * @example
     * // Update or create a StravaRefreshToken
     * const stravaRefreshToken = await prisma.stravaRefreshToken.upsert({
     *   create: {
     *     // ... data to create a StravaRefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StravaRefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends StravaRefreshTokenUpsertArgs>(args: SelectSubset<T, StravaRefreshTokenUpsertArgs<ExtArgs>>): Prisma__StravaRefreshTokenClient<$Result.GetResult<Prisma.$StravaRefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StravaRefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaRefreshTokenCountArgs} args - Arguments to filter StravaRefreshTokens to count.
     * @example
     * // Count the number of StravaRefreshTokens
     * const count = await prisma.stravaRefreshToken.count({
     *   where: {
     *     // ... the filter for the StravaRefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends StravaRefreshTokenCountArgs>(
      args?: Subset<T, StravaRefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StravaRefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StravaRefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaRefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StravaRefreshTokenAggregateArgs>(args: Subset<T, StravaRefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetStravaRefreshTokenAggregateType<T>>

    /**
     * Group by StravaRefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaRefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StravaRefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StravaRefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: StravaRefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StravaRefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStravaRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StravaRefreshToken model
   */
  readonly fields: StravaRefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StravaRefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StravaRefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StravaRefreshToken model
   */
  interface StravaRefreshTokenFieldRefs {
    readonly athleteId: FieldRef<"StravaRefreshToken", 'Int'>
    readonly tokenCode: FieldRef<"StravaRefreshToken", 'String'>
    readonly scope: FieldRef<"StravaRefreshToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StravaRefreshToken findUnique
   */
  export type StravaRefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * Filter, which StravaRefreshToken to fetch.
     */
    where: StravaRefreshTokenWhereUniqueInput
  }

  /**
   * StravaRefreshToken findUniqueOrThrow
   */
  export type StravaRefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * Filter, which StravaRefreshToken to fetch.
     */
    where: StravaRefreshTokenWhereUniqueInput
  }

  /**
   * StravaRefreshToken findFirst
   */
  export type StravaRefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * Filter, which StravaRefreshToken to fetch.
     */
    where?: StravaRefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaRefreshTokens to fetch.
     */
    orderBy?: StravaRefreshTokenOrderByWithRelationInput | StravaRefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StravaRefreshTokens.
     */
    cursor?: StravaRefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaRefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaRefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StravaRefreshTokens.
     */
    distinct?: StravaRefreshTokenScalarFieldEnum | StravaRefreshTokenScalarFieldEnum[]
  }

  /**
   * StravaRefreshToken findFirstOrThrow
   */
  export type StravaRefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * Filter, which StravaRefreshToken to fetch.
     */
    where?: StravaRefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaRefreshTokens to fetch.
     */
    orderBy?: StravaRefreshTokenOrderByWithRelationInput | StravaRefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StravaRefreshTokens.
     */
    cursor?: StravaRefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaRefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaRefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StravaRefreshTokens.
     */
    distinct?: StravaRefreshTokenScalarFieldEnum | StravaRefreshTokenScalarFieldEnum[]
  }

  /**
   * StravaRefreshToken findMany
   */
  export type StravaRefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * Filter, which StravaRefreshTokens to fetch.
     */
    where?: StravaRefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaRefreshTokens to fetch.
     */
    orderBy?: StravaRefreshTokenOrderByWithRelationInput | StravaRefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StravaRefreshTokens.
     */
    cursor?: StravaRefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaRefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaRefreshTokens.
     */
    skip?: number
    distinct?: StravaRefreshTokenScalarFieldEnum | StravaRefreshTokenScalarFieldEnum[]
  }

  /**
   * StravaRefreshToken create
   */
  export type StravaRefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a StravaRefreshToken.
     */
    data: XOR<StravaRefreshTokenCreateInput, StravaRefreshTokenUncheckedCreateInput>
  }

  /**
   * StravaRefreshToken createMany
   */
  export type StravaRefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StravaRefreshTokens.
     */
    data: StravaRefreshTokenCreateManyInput | StravaRefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StravaRefreshToken createManyAndReturn
   */
  export type StravaRefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many StravaRefreshTokens.
     */
    data: StravaRefreshTokenCreateManyInput | StravaRefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StravaRefreshToken update
   */
  export type StravaRefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a StravaRefreshToken.
     */
    data: XOR<StravaRefreshTokenUpdateInput, StravaRefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which StravaRefreshToken to update.
     */
    where: StravaRefreshTokenWhereUniqueInput
  }

  /**
   * StravaRefreshToken updateMany
   */
  export type StravaRefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StravaRefreshTokens.
     */
    data: XOR<StravaRefreshTokenUpdateManyMutationInput, StravaRefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which StravaRefreshTokens to update
     */
    where?: StravaRefreshTokenWhereInput
    /**
     * Limit how many StravaRefreshTokens to update.
     */
    limit?: number
  }

  /**
   * StravaRefreshToken updateManyAndReturn
   */
  export type StravaRefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update StravaRefreshTokens.
     */
    data: XOR<StravaRefreshTokenUpdateManyMutationInput, StravaRefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which StravaRefreshTokens to update
     */
    where?: StravaRefreshTokenWhereInput
    /**
     * Limit how many StravaRefreshTokens to update.
     */
    limit?: number
  }

  /**
   * StravaRefreshToken upsert
   */
  export type StravaRefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the StravaRefreshToken to update in case it exists.
     */
    where: StravaRefreshTokenWhereUniqueInput
    /**
     * In case the StravaRefreshToken found by the `where` argument doesn't exist, create a new StravaRefreshToken with this data.
     */
    create: XOR<StravaRefreshTokenCreateInput, StravaRefreshTokenUncheckedCreateInput>
    /**
     * In case the StravaRefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StravaRefreshTokenUpdateInput, StravaRefreshTokenUncheckedUpdateInput>
  }

  /**
   * StravaRefreshToken delete
   */
  export type StravaRefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
    /**
     * Filter which StravaRefreshToken to delete.
     */
    where: StravaRefreshTokenWhereUniqueInput
  }

  /**
   * StravaRefreshToken deleteMany
   */
  export type StravaRefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StravaRefreshTokens to delete
     */
    where?: StravaRefreshTokenWhereInput
    /**
     * Limit how many StravaRefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * StravaRefreshToken without action
   */
  export type StravaRefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaRefreshToken
     */
    select?: StravaRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaRefreshToken
     */
    omit?: StravaRefreshTokenOmit<ExtArgs> | null
  }


  /**
   * Model StravaActivity
   */

  export type AggregateStravaActivity = {
    _count: StravaActivityCountAggregateOutputType | null
    _avg: StravaActivityAvgAggregateOutputType | null
    _sum: StravaActivitySumAggregateOutputType | null
    _min: StravaActivityMinAggregateOutputType | null
    _max: StravaActivityMaxAggregateOutputType | null
  }

  export type StravaActivityAvgAggregateOutputType = {
    id: number | null
    athleteId: number | null
    distance: number | null
    totalElevationGain: number | null
  }

  export type StravaActivitySumAggregateOutputType = {
    id: bigint | null
    athleteId: bigint | null
    distance: number | null
    totalElevationGain: number | null
  }

  export type StravaActivityMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    athleteId: bigint | null
    distance: number | null
    totalElevationGain: number | null
    sportType: string | null
    startDate: Date | null
    mapPolyline: string | null
    private: boolean | null
  }

  export type StravaActivityMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    athleteId: bigint | null
    distance: number | null
    totalElevationGain: number | null
    sportType: string | null
    startDate: Date | null
    mapPolyline: string | null
    private: boolean | null
  }

  export type StravaActivityCountAggregateOutputType = {
    id: number
    name: number
    athleteId: number
    distance: number
    totalElevationGain: number
    sportType: number
    startDate: number
    mapPolyline: number
    private: number
    _all: number
  }


  export type StravaActivityAvgAggregateInputType = {
    id?: true
    athleteId?: true
    distance?: true
    totalElevationGain?: true
  }

  export type StravaActivitySumAggregateInputType = {
    id?: true
    athleteId?: true
    distance?: true
    totalElevationGain?: true
  }

  export type StravaActivityMinAggregateInputType = {
    id?: true
    name?: true
    athleteId?: true
    distance?: true
    totalElevationGain?: true
    sportType?: true
    startDate?: true
    mapPolyline?: true
    private?: true
  }

  export type StravaActivityMaxAggregateInputType = {
    id?: true
    name?: true
    athleteId?: true
    distance?: true
    totalElevationGain?: true
    sportType?: true
    startDate?: true
    mapPolyline?: true
    private?: true
  }

  export type StravaActivityCountAggregateInputType = {
    id?: true
    name?: true
    athleteId?: true
    distance?: true
    totalElevationGain?: true
    sportType?: true
    startDate?: true
    mapPolyline?: true
    private?: true
    _all?: true
  }

  export type StravaActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StravaActivity to aggregate.
     */
    where?: StravaActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaActivities to fetch.
     */
    orderBy?: StravaActivityOrderByWithRelationInput | StravaActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StravaActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StravaActivities
    **/
    _count?: true | StravaActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StravaActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StravaActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StravaActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StravaActivityMaxAggregateInputType
  }

  export type GetStravaActivityAggregateType<T extends StravaActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateStravaActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStravaActivity[P]>
      : GetScalarType<T[P], AggregateStravaActivity[P]>
  }




  export type StravaActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StravaActivityWhereInput
    orderBy?: StravaActivityOrderByWithAggregationInput | StravaActivityOrderByWithAggregationInput[]
    by: StravaActivityScalarFieldEnum[] | StravaActivityScalarFieldEnum
    having?: StravaActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StravaActivityCountAggregateInputType | true
    _avg?: StravaActivityAvgAggregateInputType
    _sum?: StravaActivitySumAggregateInputType
    _min?: StravaActivityMinAggregateInputType
    _max?: StravaActivityMaxAggregateInputType
  }

  export type StravaActivityGroupByOutputType = {
    id: bigint
    name: string
    athleteId: bigint
    distance: number | null
    totalElevationGain: number | null
    sportType: string
    startDate: Date
    mapPolyline: string | null
    private: boolean | null
    _count: StravaActivityCountAggregateOutputType | null
    _avg: StravaActivityAvgAggregateOutputType | null
    _sum: StravaActivitySumAggregateOutputType | null
    _min: StravaActivityMinAggregateOutputType | null
    _max: StravaActivityMaxAggregateOutputType | null
  }

  type GetStravaActivityGroupByPayload<T extends StravaActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StravaActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StravaActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StravaActivityGroupByOutputType[P]>
            : GetScalarType<T[P], StravaActivityGroupByOutputType[P]>
        }
      >
    >


  export type StravaActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    athleteId?: boolean
    distance?: boolean
    totalElevationGain?: boolean
    sportType?: boolean
    startDate?: boolean
    mapPolyline?: boolean
    private?: boolean
  }, ExtArgs["result"]["stravaActivity"]>

  export type StravaActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    athleteId?: boolean
    distance?: boolean
    totalElevationGain?: boolean
    sportType?: boolean
    startDate?: boolean
    mapPolyline?: boolean
    private?: boolean
  }, ExtArgs["result"]["stravaActivity"]>

  export type StravaActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    athleteId?: boolean
    distance?: boolean
    totalElevationGain?: boolean
    sportType?: boolean
    startDate?: boolean
    mapPolyline?: boolean
    private?: boolean
  }, ExtArgs["result"]["stravaActivity"]>

  export type StravaActivitySelectScalar = {
    id?: boolean
    name?: boolean
    athleteId?: boolean
    distance?: boolean
    totalElevationGain?: boolean
    sportType?: boolean
    startDate?: boolean
    mapPolyline?: boolean
    private?: boolean
  }

  export type StravaActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "athleteId" | "distance" | "totalElevationGain" | "sportType" | "startDate" | "mapPolyline" | "private", ExtArgs["result"]["stravaActivity"]>

  export type $StravaActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StravaActivity"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      athleteId: bigint
      distance: number | null
      totalElevationGain: number | null
      sportType: string
      startDate: Date
      mapPolyline: string | null
      private: boolean | null
    }, ExtArgs["result"]["stravaActivity"]>
    composites: {}
  }

  type StravaActivityGetPayload<S extends boolean | null | undefined | StravaActivityDefaultArgs> = $Result.GetResult<Prisma.$StravaActivityPayload, S>

  type StravaActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StravaActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StravaActivityCountAggregateInputType | true
    }

  export interface StravaActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StravaActivity'], meta: { name: 'StravaActivity' } }
    /**
     * Find zero or one StravaActivity that matches the filter.
     * @param {StravaActivityFindUniqueArgs} args - Arguments to find a StravaActivity
     * @example
     * // Get one StravaActivity
     * const stravaActivity = await prisma.stravaActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StravaActivityFindUniqueArgs>(args: SelectSubset<T, StravaActivityFindUniqueArgs<ExtArgs>>): Prisma__StravaActivityClient<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StravaActivity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StravaActivityFindUniqueOrThrowArgs} args - Arguments to find a StravaActivity
     * @example
     * // Get one StravaActivity
     * const stravaActivity = await prisma.stravaActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StravaActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, StravaActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StravaActivityClient<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StravaActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaActivityFindFirstArgs} args - Arguments to find a StravaActivity
     * @example
     * // Get one StravaActivity
     * const stravaActivity = await prisma.stravaActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StravaActivityFindFirstArgs>(args?: SelectSubset<T, StravaActivityFindFirstArgs<ExtArgs>>): Prisma__StravaActivityClient<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StravaActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaActivityFindFirstOrThrowArgs} args - Arguments to find a StravaActivity
     * @example
     * // Get one StravaActivity
     * const stravaActivity = await prisma.stravaActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StravaActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, StravaActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__StravaActivityClient<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StravaActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StravaActivities
     * const stravaActivities = await prisma.stravaActivity.findMany()
     * 
     * // Get first 10 StravaActivities
     * const stravaActivities = await prisma.stravaActivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stravaActivityWithIdOnly = await prisma.stravaActivity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StravaActivityFindManyArgs>(args?: SelectSubset<T, StravaActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StravaActivity.
     * @param {StravaActivityCreateArgs} args - Arguments to create a StravaActivity.
     * @example
     * // Create one StravaActivity
     * const StravaActivity = await prisma.stravaActivity.create({
     *   data: {
     *     // ... data to create a StravaActivity
     *   }
     * })
     * 
     */
    create<T extends StravaActivityCreateArgs>(args: SelectSubset<T, StravaActivityCreateArgs<ExtArgs>>): Prisma__StravaActivityClient<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StravaActivities.
     * @param {StravaActivityCreateManyArgs} args - Arguments to create many StravaActivities.
     * @example
     * // Create many StravaActivities
     * const stravaActivity = await prisma.stravaActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StravaActivityCreateManyArgs>(args?: SelectSubset<T, StravaActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StravaActivities and returns the data saved in the database.
     * @param {StravaActivityCreateManyAndReturnArgs} args - Arguments to create many StravaActivities.
     * @example
     * // Create many StravaActivities
     * const stravaActivity = await prisma.stravaActivity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StravaActivities and only return the `id`
     * const stravaActivityWithIdOnly = await prisma.stravaActivity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StravaActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, StravaActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StravaActivity.
     * @param {StravaActivityDeleteArgs} args - Arguments to delete one StravaActivity.
     * @example
     * // Delete one StravaActivity
     * const StravaActivity = await prisma.stravaActivity.delete({
     *   where: {
     *     // ... filter to delete one StravaActivity
     *   }
     * })
     * 
     */
    delete<T extends StravaActivityDeleteArgs>(args: SelectSubset<T, StravaActivityDeleteArgs<ExtArgs>>): Prisma__StravaActivityClient<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StravaActivity.
     * @param {StravaActivityUpdateArgs} args - Arguments to update one StravaActivity.
     * @example
     * // Update one StravaActivity
     * const stravaActivity = await prisma.stravaActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StravaActivityUpdateArgs>(args: SelectSubset<T, StravaActivityUpdateArgs<ExtArgs>>): Prisma__StravaActivityClient<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StravaActivities.
     * @param {StravaActivityDeleteManyArgs} args - Arguments to filter StravaActivities to delete.
     * @example
     * // Delete a few StravaActivities
     * const { count } = await prisma.stravaActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StravaActivityDeleteManyArgs>(args?: SelectSubset<T, StravaActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StravaActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StravaActivities
     * const stravaActivity = await prisma.stravaActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StravaActivityUpdateManyArgs>(args: SelectSubset<T, StravaActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StravaActivities and returns the data updated in the database.
     * @param {StravaActivityUpdateManyAndReturnArgs} args - Arguments to update many StravaActivities.
     * @example
     * // Update many StravaActivities
     * const stravaActivity = await prisma.stravaActivity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StravaActivities and only return the `id`
     * const stravaActivityWithIdOnly = await prisma.stravaActivity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StravaActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, StravaActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StravaActivity.
     * @param {StravaActivityUpsertArgs} args - Arguments to update or create a StravaActivity.
     * @example
     * // Update or create a StravaActivity
     * const stravaActivity = await prisma.stravaActivity.upsert({
     *   create: {
     *     // ... data to create a StravaActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StravaActivity we want to update
     *   }
     * })
     */
    upsert<T extends StravaActivityUpsertArgs>(args: SelectSubset<T, StravaActivityUpsertArgs<ExtArgs>>): Prisma__StravaActivityClient<$Result.GetResult<Prisma.$StravaActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StravaActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaActivityCountArgs} args - Arguments to filter StravaActivities to count.
     * @example
     * // Count the number of StravaActivities
     * const count = await prisma.stravaActivity.count({
     *   where: {
     *     // ... the filter for the StravaActivities we want to count
     *   }
     * })
    **/
    count<T extends StravaActivityCountArgs>(
      args?: Subset<T, StravaActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StravaActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StravaActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StravaActivityAggregateArgs>(args: Subset<T, StravaActivityAggregateArgs>): Prisma.PrismaPromise<GetStravaActivityAggregateType<T>>

    /**
     * Group by StravaActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StravaActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StravaActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StravaActivityGroupByArgs['orderBy'] }
        : { orderBy?: StravaActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StravaActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStravaActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StravaActivity model
   */
  readonly fields: StravaActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StravaActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StravaActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StravaActivity model
   */
  interface StravaActivityFieldRefs {
    readonly id: FieldRef<"StravaActivity", 'BigInt'>
    readonly name: FieldRef<"StravaActivity", 'String'>
    readonly athleteId: FieldRef<"StravaActivity", 'BigInt'>
    readonly distance: FieldRef<"StravaActivity", 'Float'>
    readonly totalElevationGain: FieldRef<"StravaActivity", 'Int'>
    readonly sportType: FieldRef<"StravaActivity", 'String'>
    readonly startDate: FieldRef<"StravaActivity", 'DateTime'>
    readonly mapPolyline: FieldRef<"StravaActivity", 'String'>
    readonly private: FieldRef<"StravaActivity", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * StravaActivity findUnique
   */
  export type StravaActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * Filter, which StravaActivity to fetch.
     */
    where: StravaActivityWhereUniqueInput
  }

  /**
   * StravaActivity findUniqueOrThrow
   */
  export type StravaActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * Filter, which StravaActivity to fetch.
     */
    where: StravaActivityWhereUniqueInput
  }

  /**
   * StravaActivity findFirst
   */
  export type StravaActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * Filter, which StravaActivity to fetch.
     */
    where?: StravaActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaActivities to fetch.
     */
    orderBy?: StravaActivityOrderByWithRelationInput | StravaActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StravaActivities.
     */
    cursor?: StravaActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StravaActivities.
     */
    distinct?: StravaActivityScalarFieldEnum | StravaActivityScalarFieldEnum[]
  }

  /**
   * StravaActivity findFirstOrThrow
   */
  export type StravaActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * Filter, which StravaActivity to fetch.
     */
    where?: StravaActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaActivities to fetch.
     */
    orderBy?: StravaActivityOrderByWithRelationInput | StravaActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StravaActivities.
     */
    cursor?: StravaActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StravaActivities.
     */
    distinct?: StravaActivityScalarFieldEnum | StravaActivityScalarFieldEnum[]
  }

  /**
   * StravaActivity findMany
   */
  export type StravaActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * Filter, which StravaActivities to fetch.
     */
    where?: StravaActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StravaActivities to fetch.
     */
    orderBy?: StravaActivityOrderByWithRelationInput | StravaActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StravaActivities.
     */
    cursor?: StravaActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StravaActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StravaActivities.
     */
    skip?: number
    distinct?: StravaActivityScalarFieldEnum | StravaActivityScalarFieldEnum[]
  }

  /**
   * StravaActivity create
   */
  export type StravaActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * The data needed to create a StravaActivity.
     */
    data: XOR<StravaActivityCreateInput, StravaActivityUncheckedCreateInput>
  }

  /**
   * StravaActivity createMany
   */
  export type StravaActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StravaActivities.
     */
    data: StravaActivityCreateManyInput | StravaActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StravaActivity createManyAndReturn
   */
  export type StravaActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * The data used to create many StravaActivities.
     */
    data: StravaActivityCreateManyInput | StravaActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StravaActivity update
   */
  export type StravaActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * The data needed to update a StravaActivity.
     */
    data: XOR<StravaActivityUpdateInput, StravaActivityUncheckedUpdateInput>
    /**
     * Choose, which StravaActivity to update.
     */
    where: StravaActivityWhereUniqueInput
  }

  /**
   * StravaActivity updateMany
   */
  export type StravaActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StravaActivities.
     */
    data: XOR<StravaActivityUpdateManyMutationInput, StravaActivityUncheckedUpdateManyInput>
    /**
     * Filter which StravaActivities to update
     */
    where?: StravaActivityWhereInput
    /**
     * Limit how many StravaActivities to update.
     */
    limit?: number
  }

  /**
   * StravaActivity updateManyAndReturn
   */
  export type StravaActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * The data used to update StravaActivities.
     */
    data: XOR<StravaActivityUpdateManyMutationInput, StravaActivityUncheckedUpdateManyInput>
    /**
     * Filter which StravaActivities to update
     */
    where?: StravaActivityWhereInput
    /**
     * Limit how many StravaActivities to update.
     */
    limit?: number
  }

  /**
   * StravaActivity upsert
   */
  export type StravaActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * The filter to search for the StravaActivity to update in case it exists.
     */
    where: StravaActivityWhereUniqueInput
    /**
     * In case the StravaActivity found by the `where` argument doesn't exist, create a new StravaActivity with this data.
     */
    create: XOR<StravaActivityCreateInput, StravaActivityUncheckedCreateInput>
    /**
     * In case the StravaActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StravaActivityUpdateInput, StravaActivityUncheckedUpdateInput>
  }

  /**
   * StravaActivity delete
   */
  export type StravaActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
    /**
     * Filter which StravaActivity to delete.
     */
    where: StravaActivityWhereUniqueInput
  }

  /**
   * StravaActivity deleteMany
   */
  export type StravaActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StravaActivities to delete
     */
    where?: StravaActivityWhereInput
    /**
     * Limit how many StravaActivities to delete.
     */
    limit?: number
  }

  /**
   * StravaActivity without action
   */
  export type StravaActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StravaActivity
     */
    select?: StravaActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the StravaActivity
     */
    omit?: StravaActivityOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StravaAccessTokenScalarFieldEnum: {
    athleteId: 'athleteId',
    tokenCode: 'tokenCode',
    scope: 'scope',
    expiresAt: 'expiresAt'
  };

  export type StravaAccessTokenScalarFieldEnum = (typeof StravaAccessTokenScalarFieldEnum)[keyof typeof StravaAccessTokenScalarFieldEnum]


  export const StravaRefreshTokenScalarFieldEnum: {
    athleteId: 'athleteId',
    tokenCode: 'tokenCode',
    scope: 'scope'
  };

  export type StravaRefreshTokenScalarFieldEnum = (typeof StravaRefreshTokenScalarFieldEnum)[keyof typeof StravaRefreshTokenScalarFieldEnum]


  export const StravaActivityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    athleteId: 'athleteId',
    distance: 'distance',
    totalElevationGain: 'totalElevationGain',
    sportType: 'sportType',
    startDate: 'startDate',
    mapPolyline: 'mapPolyline',
    private: 'private'
  };

  export type StravaActivityScalarFieldEnum = (typeof StravaActivityScalarFieldEnum)[keyof typeof StravaActivityScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type StravaAccessTokenWhereInput = {
    AND?: StravaAccessTokenWhereInput | StravaAccessTokenWhereInput[]
    OR?: StravaAccessTokenWhereInput[]
    NOT?: StravaAccessTokenWhereInput | StravaAccessTokenWhereInput[]
    athleteId?: IntFilter<"StravaAccessToken"> | number
    tokenCode?: StringFilter<"StravaAccessToken"> | string
    scope?: StringFilter<"StravaAccessToken"> | string
    expiresAt?: BigIntFilter<"StravaAccessToken"> | bigint | number
  }

  export type StravaAccessTokenOrderByWithRelationInput = {
    athleteId?: SortOrder
    tokenCode?: SortOrder
    scope?: SortOrder
    expiresAt?: SortOrder
  }

  export type StravaAccessTokenWhereUniqueInput = Prisma.AtLeast<{
    athleteId?: number
    AND?: StravaAccessTokenWhereInput | StravaAccessTokenWhereInput[]
    OR?: StravaAccessTokenWhereInput[]
    NOT?: StravaAccessTokenWhereInput | StravaAccessTokenWhereInput[]
    tokenCode?: StringFilter<"StravaAccessToken"> | string
    scope?: StringFilter<"StravaAccessToken"> | string
    expiresAt?: BigIntFilter<"StravaAccessToken"> | bigint | number
  }, "athleteId" | "athleteId">

  export type StravaAccessTokenOrderByWithAggregationInput = {
    athleteId?: SortOrder
    tokenCode?: SortOrder
    scope?: SortOrder
    expiresAt?: SortOrder
    _count?: StravaAccessTokenCountOrderByAggregateInput
    _avg?: StravaAccessTokenAvgOrderByAggregateInput
    _max?: StravaAccessTokenMaxOrderByAggregateInput
    _min?: StravaAccessTokenMinOrderByAggregateInput
    _sum?: StravaAccessTokenSumOrderByAggregateInput
  }

  export type StravaAccessTokenScalarWhereWithAggregatesInput = {
    AND?: StravaAccessTokenScalarWhereWithAggregatesInput | StravaAccessTokenScalarWhereWithAggregatesInput[]
    OR?: StravaAccessTokenScalarWhereWithAggregatesInput[]
    NOT?: StravaAccessTokenScalarWhereWithAggregatesInput | StravaAccessTokenScalarWhereWithAggregatesInput[]
    athleteId?: IntWithAggregatesFilter<"StravaAccessToken"> | number
    tokenCode?: StringWithAggregatesFilter<"StravaAccessToken"> | string
    scope?: StringWithAggregatesFilter<"StravaAccessToken"> | string
    expiresAt?: BigIntWithAggregatesFilter<"StravaAccessToken"> | bigint | number
  }

  export type StravaRefreshTokenWhereInput = {
    AND?: StravaRefreshTokenWhereInput | StravaRefreshTokenWhereInput[]
    OR?: StravaRefreshTokenWhereInput[]
    NOT?: StravaRefreshTokenWhereInput | StravaRefreshTokenWhereInput[]
    athleteId?: IntFilter<"StravaRefreshToken"> | number
    tokenCode?: StringFilter<"StravaRefreshToken"> | string
    scope?: StringFilter<"StravaRefreshToken"> | string
  }

  export type StravaRefreshTokenOrderByWithRelationInput = {
    athleteId?: SortOrder
    tokenCode?: SortOrder
    scope?: SortOrder
  }

  export type StravaRefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    athleteId?: number
    AND?: StravaRefreshTokenWhereInput | StravaRefreshTokenWhereInput[]
    OR?: StravaRefreshTokenWhereInput[]
    NOT?: StravaRefreshTokenWhereInput | StravaRefreshTokenWhereInput[]
    tokenCode?: StringFilter<"StravaRefreshToken"> | string
    scope?: StringFilter<"StravaRefreshToken"> | string
  }, "athleteId" | "athleteId">

  export type StravaRefreshTokenOrderByWithAggregationInput = {
    athleteId?: SortOrder
    tokenCode?: SortOrder
    scope?: SortOrder
    _count?: StravaRefreshTokenCountOrderByAggregateInput
    _avg?: StravaRefreshTokenAvgOrderByAggregateInput
    _max?: StravaRefreshTokenMaxOrderByAggregateInput
    _min?: StravaRefreshTokenMinOrderByAggregateInput
    _sum?: StravaRefreshTokenSumOrderByAggregateInput
  }

  export type StravaRefreshTokenScalarWhereWithAggregatesInput = {
    AND?: StravaRefreshTokenScalarWhereWithAggregatesInput | StravaRefreshTokenScalarWhereWithAggregatesInput[]
    OR?: StravaRefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: StravaRefreshTokenScalarWhereWithAggregatesInput | StravaRefreshTokenScalarWhereWithAggregatesInput[]
    athleteId?: IntWithAggregatesFilter<"StravaRefreshToken"> | number
    tokenCode?: StringWithAggregatesFilter<"StravaRefreshToken"> | string
    scope?: StringWithAggregatesFilter<"StravaRefreshToken"> | string
  }

  export type StravaActivityWhereInput = {
    AND?: StravaActivityWhereInput | StravaActivityWhereInput[]
    OR?: StravaActivityWhereInput[]
    NOT?: StravaActivityWhereInput | StravaActivityWhereInput[]
    id?: BigIntFilter<"StravaActivity"> | bigint | number
    name?: StringFilter<"StravaActivity"> | string
    athleteId?: BigIntFilter<"StravaActivity"> | bigint | number
    distance?: FloatNullableFilter<"StravaActivity"> | number | null
    totalElevationGain?: IntNullableFilter<"StravaActivity"> | number | null
    sportType?: StringFilter<"StravaActivity"> | string
    startDate?: DateTimeFilter<"StravaActivity"> | Date | string
    mapPolyline?: StringNullableFilter<"StravaActivity"> | string | null
    private?: BoolNullableFilter<"StravaActivity"> | boolean | null
  }

  export type StravaActivityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    athleteId?: SortOrder
    distance?: SortOrderInput | SortOrder
    totalElevationGain?: SortOrderInput | SortOrder
    sportType?: SortOrder
    startDate?: SortOrder
    mapPolyline?: SortOrderInput | SortOrder
    private?: SortOrderInput | SortOrder
  }

  export type StravaActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: StravaActivityWhereInput | StravaActivityWhereInput[]
    OR?: StravaActivityWhereInput[]
    NOT?: StravaActivityWhereInput | StravaActivityWhereInput[]
    name?: StringFilter<"StravaActivity"> | string
    athleteId?: BigIntFilter<"StravaActivity"> | bigint | number
    distance?: FloatNullableFilter<"StravaActivity"> | number | null
    totalElevationGain?: IntNullableFilter<"StravaActivity"> | number | null
    sportType?: StringFilter<"StravaActivity"> | string
    startDate?: DateTimeFilter<"StravaActivity"> | Date | string
    mapPolyline?: StringNullableFilter<"StravaActivity"> | string | null
    private?: BoolNullableFilter<"StravaActivity"> | boolean | null
  }, "id" | "id">

  export type StravaActivityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    athleteId?: SortOrder
    distance?: SortOrderInput | SortOrder
    totalElevationGain?: SortOrderInput | SortOrder
    sportType?: SortOrder
    startDate?: SortOrder
    mapPolyline?: SortOrderInput | SortOrder
    private?: SortOrderInput | SortOrder
    _count?: StravaActivityCountOrderByAggregateInput
    _avg?: StravaActivityAvgOrderByAggregateInput
    _max?: StravaActivityMaxOrderByAggregateInput
    _min?: StravaActivityMinOrderByAggregateInput
    _sum?: StravaActivitySumOrderByAggregateInput
  }

  export type StravaActivityScalarWhereWithAggregatesInput = {
    AND?: StravaActivityScalarWhereWithAggregatesInput | StravaActivityScalarWhereWithAggregatesInput[]
    OR?: StravaActivityScalarWhereWithAggregatesInput[]
    NOT?: StravaActivityScalarWhereWithAggregatesInput | StravaActivityScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"StravaActivity"> | bigint | number
    name?: StringWithAggregatesFilter<"StravaActivity"> | string
    athleteId?: BigIntWithAggregatesFilter<"StravaActivity"> | bigint | number
    distance?: FloatNullableWithAggregatesFilter<"StravaActivity"> | number | null
    totalElevationGain?: IntNullableWithAggregatesFilter<"StravaActivity"> | number | null
    sportType?: StringWithAggregatesFilter<"StravaActivity"> | string
    startDate?: DateTimeWithAggregatesFilter<"StravaActivity"> | Date | string
    mapPolyline?: StringNullableWithAggregatesFilter<"StravaActivity"> | string | null
    private?: BoolNullableWithAggregatesFilter<"StravaActivity"> | boolean | null
  }

  export type StravaAccessTokenCreateInput = {
    athleteId: number
    tokenCode: string
    scope: string
    expiresAt: bigint | number
  }

  export type StravaAccessTokenUncheckedCreateInput = {
    athleteId: number
    tokenCode: string
    scope: string
    expiresAt: bigint | number
  }

  export type StravaAccessTokenUpdateInput = {
    athleteId?: IntFieldUpdateOperationsInput | number
    tokenCode?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type StravaAccessTokenUncheckedUpdateInput = {
    athleteId?: IntFieldUpdateOperationsInput | number
    tokenCode?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type StravaAccessTokenCreateManyInput = {
    athleteId: number
    tokenCode: string
    scope: string
    expiresAt: bigint | number
  }

  export type StravaAccessTokenUpdateManyMutationInput = {
    athleteId?: IntFieldUpdateOperationsInput | number
    tokenCode?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type StravaAccessTokenUncheckedUpdateManyInput = {
    athleteId?: IntFieldUpdateOperationsInput | number
    tokenCode?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type StravaRefreshTokenCreateInput = {
    athleteId: number
    tokenCode: string
    scope: string
  }

  export type StravaRefreshTokenUncheckedCreateInput = {
    athleteId: number
    tokenCode: string
    scope: string
  }

  export type StravaRefreshTokenUpdateInput = {
    athleteId?: IntFieldUpdateOperationsInput | number
    tokenCode?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
  }

  export type StravaRefreshTokenUncheckedUpdateInput = {
    athleteId?: IntFieldUpdateOperationsInput | number
    tokenCode?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
  }

  export type StravaRefreshTokenCreateManyInput = {
    athleteId: number
    tokenCode: string
    scope: string
  }

  export type StravaRefreshTokenUpdateManyMutationInput = {
    athleteId?: IntFieldUpdateOperationsInput | number
    tokenCode?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
  }

  export type StravaRefreshTokenUncheckedUpdateManyInput = {
    athleteId?: IntFieldUpdateOperationsInput | number
    tokenCode?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
  }

  export type StravaActivityCreateInput = {
    id: bigint | number
    name: string
    athleteId: bigint | number
    distance?: number | null
    totalElevationGain?: number | null
    sportType: string
    startDate: Date | string
    mapPolyline?: string | null
    private?: boolean | null
  }

  export type StravaActivityUncheckedCreateInput = {
    id: bigint | number
    name: string
    athleteId: bigint | number
    distance?: number | null
    totalElevationGain?: number | null
    sportType: string
    startDate: Date | string
    mapPolyline?: string | null
    private?: boolean | null
  }

  export type StravaActivityUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    athleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    totalElevationGain?: NullableIntFieldUpdateOperationsInput | number | null
    sportType?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    mapPolyline?: NullableStringFieldUpdateOperationsInput | string | null
    private?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type StravaActivityUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    athleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    totalElevationGain?: NullableIntFieldUpdateOperationsInput | number | null
    sportType?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    mapPolyline?: NullableStringFieldUpdateOperationsInput | string | null
    private?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type StravaActivityCreateManyInput = {
    id: bigint | number
    name: string
    athleteId: bigint | number
    distance?: number | null
    totalElevationGain?: number | null
    sportType: string
    startDate: Date | string
    mapPolyline?: string | null
    private?: boolean | null
  }

  export type StravaActivityUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    athleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    totalElevationGain?: NullableIntFieldUpdateOperationsInput | number | null
    sportType?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    mapPolyline?: NullableStringFieldUpdateOperationsInput | string | null
    private?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type StravaActivityUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    athleteId?: BigIntFieldUpdateOperationsInput | bigint | number
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    totalElevationGain?: NullableIntFieldUpdateOperationsInput | number | null
    sportType?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    mapPolyline?: NullableStringFieldUpdateOperationsInput | string | null
    private?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StravaAccessTokenCountOrderByAggregateInput = {
    athleteId?: SortOrder
    tokenCode?: SortOrder
    scope?: SortOrder
    expiresAt?: SortOrder
  }

  export type StravaAccessTokenAvgOrderByAggregateInput = {
    athleteId?: SortOrder
    expiresAt?: SortOrder
  }

  export type StravaAccessTokenMaxOrderByAggregateInput = {
    athleteId?: SortOrder
    tokenCode?: SortOrder
    scope?: SortOrder
    expiresAt?: SortOrder
  }

  export type StravaAccessTokenMinOrderByAggregateInput = {
    athleteId?: SortOrder
    tokenCode?: SortOrder
    scope?: SortOrder
    expiresAt?: SortOrder
  }

  export type StravaAccessTokenSumOrderByAggregateInput = {
    athleteId?: SortOrder
    expiresAt?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StravaRefreshTokenCountOrderByAggregateInput = {
    athleteId?: SortOrder
    tokenCode?: SortOrder
    scope?: SortOrder
  }

  export type StravaRefreshTokenAvgOrderByAggregateInput = {
    athleteId?: SortOrder
  }

  export type StravaRefreshTokenMaxOrderByAggregateInput = {
    athleteId?: SortOrder
    tokenCode?: SortOrder
    scope?: SortOrder
  }

  export type StravaRefreshTokenMinOrderByAggregateInput = {
    athleteId?: SortOrder
    tokenCode?: SortOrder
    scope?: SortOrder
  }

  export type StravaRefreshTokenSumOrderByAggregateInput = {
    athleteId?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StravaActivityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    athleteId?: SortOrder
    distance?: SortOrder
    totalElevationGain?: SortOrder
    sportType?: SortOrder
    startDate?: SortOrder
    mapPolyline?: SortOrder
    private?: SortOrder
  }

  export type StravaActivityAvgOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    distance?: SortOrder
    totalElevationGain?: SortOrder
  }

  export type StravaActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    athleteId?: SortOrder
    distance?: SortOrder
    totalElevationGain?: SortOrder
    sportType?: SortOrder
    startDate?: SortOrder
    mapPolyline?: SortOrder
    private?: SortOrder
  }

  export type StravaActivityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    athleteId?: SortOrder
    distance?: SortOrder
    totalElevationGain?: SortOrder
    sportType?: SortOrder
    startDate?: SortOrder
    mapPolyline?: SortOrder
    private?: SortOrder
  }

  export type StravaActivitySumOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    distance?: SortOrder
    totalElevationGain?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}