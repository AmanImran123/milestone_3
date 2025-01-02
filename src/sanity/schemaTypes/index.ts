import { defineType } from 'sanity';
import blog from './blog';

export const schemaTypes = [
  defineType(blog), // Wrap individual schema definitions with `defineType`
];
