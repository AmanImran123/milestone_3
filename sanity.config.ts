'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schemaTypes} from '@/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  name:'default',
  title:'Blog Website',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
  schema: {
    types: schemaTypes,
  },
})
