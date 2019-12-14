import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface Log extends mongoose.Document{
    timestamp: string,
    text: string
}

export interface LogModel extends mongoose.Model<Log>{
    findByLog(text: string): Promise<Log>
}

const logSchema = new Schema({
    timestamp: {
        type: String,
        allowNull: false
    },
    text: {
        type: String,
        allowNull: false
    }
})

export const Log = mongoose.model<Log, LogModel>('Log', logSchema)