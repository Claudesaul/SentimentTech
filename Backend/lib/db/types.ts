import { ObjectId } from 'mongodb'

export interface Stock {
  _id?: ObjectId
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  volume: string
  marketCap: string
  peRatio: number
  lastUpdated: Date
}

export interface StockData {
  _id?: ObjectId
  symbol: string
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  period: string
}

export interface SentimentData {
  _id?: ObjectId
  symbol: string
  source: string
  sentiment: number
  confidence: number
  timestamp: Date
  text: string
  url?: string
}

export interface AISummary {
  _id?: ObjectId
  symbol: string
  summary: string
  timestamp: Date
  period: string
  sentiment: number
  confidence: number
} 