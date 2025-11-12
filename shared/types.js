/**
 * Tipos y constantes compartidas entre backend y frontend
 */

export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  PRODUCTS: '/api/products',
  SALES: '/api/sales',
  PREDICTIONS: '/api/predictions'
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
}

export const PREDICTION_MONTHS = {
  MIN: 1,
  MAX: 12,
  DEFAULT: 3
}
