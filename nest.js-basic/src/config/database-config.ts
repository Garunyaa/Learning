import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const connectionString = this.configService.get<string>('MONGODB_URL');

    if (!connectionString) {
      console.error('MongoDB connection string is not defined!');
      return;
    }

    try {
      // Ensure MongoDB is connected
      await mongoose.connect(connectionString);
      console.log('MongoDB successfully connected');
    } catch (err) {
      console.error('MongoDB connection failed', err);
    }

    const connection = mongoose.connection;

    connection.on('disconnected', () => {
      if (process.env.NODE_ENV !== 'test') {
        console.log('MongoDB disconnected');
      }
    });
  }
}