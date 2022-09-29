import { EnvironmentBuilder } from '@hexlabs/env-vars-ts'

const { environment } = EnvironmentBuilder.create(
  'VITE_MODE',
  'VITE_PROD',
  'VITE_DEV',
  'VITE_API_URL',
).optionals('VITE_FEATURE_ENABLED_DARKMODE')
  .transform(num => parseInt(num), 'VITE_PROD')
  .transform(num => parseInt(num), 'VITE_DEV')
  .defaults({
    VITE_MODE: 'dev',
    VITE_PROD: 0,
    VITE_DEV: 1,
    VITE_API_URL: 'http://localhost:8000/',
  })

export const envVariables = environment()
