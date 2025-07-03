import clientPromise from './mongodb'
import { ObjectId } from 'mongodb'

export async function getCollection(collectionName: string) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return db.collection(collectionName)
}

export async function findOne(collectionName: string, query: any) {
  const collection = await getCollection(collectionName)
  return collection.findOne(query)
}

export async function find(collectionName: string, query: any, options?: any) {
  const collection = await getCollection(collectionName)
  return collection.find(query, options).toArray()
}

export async function insertOne(collectionName: string, document: any) {
  const collection = await getCollection(collectionName)
  return collection.insertOne(document)
}

export async function updateOne(collectionName: string, query: any, update: any) {
  const collection = await getCollection(collectionName)
  return collection.updateOne(query, update)
}

export async function deleteOne(collectionName: string, query: any) {
  const collection = await getCollection(collectionName)
  return collection.deleteOne(query)
}

export async function aggregate(collectionName: string, pipeline: any[]) {
  const collection = await getCollection(collectionName)
  return collection.aggregate(pipeline).toArray()
}

// Helper function to convert string ID to ObjectId
export function toObjectId(id: string) {
  return new ObjectId(id)
} 