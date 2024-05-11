import Joi from 'joi';

export const appConfigValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(
    'development',
    'production',
    'local',
    'test',
    'staging',
  ),
  TENANT_DB_HOST: Joi.string().required(),
  TENANT_DB_PORT: Joi.number().required(),
  TENANT_DB_USERNAME: Joi.string().required(),
  TENANT_DB_PASSWORD: Joi.string().required(),
  TENANT_DB_NAME: Joi.string().required(),
  FALLBACK_LANGUAGE: Joi.string().required(),
  THROTTLE_TTL: Joi.number().required(),
  THROTTLE_LIMIT: Joi.number().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
});
