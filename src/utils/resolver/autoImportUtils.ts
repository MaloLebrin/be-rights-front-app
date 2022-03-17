import fs from 'fs'

export const getFileNames = (dir: string) => fs.readdirSync(dir)
  .map(file => {
    return file.split('.ts')[0]
  })

export function getDirectoryAuthImportPaths(dir: string): Record<string, string> {
  if (dir === './src/store') {
    return getFileNames(dir)
      .reduce((acc, name) => ({
        ...acc,
        [name]: `${dir}/${name}/${name}Store`,
      }), {})
  }
  return getFileNames(dir).reduce((acc, name) => ({
    ...acc,
    [name]: `${dir}/${name}`,
  }), {})
}

export const EXCLUDES_STORE_FOLDER_NAME = [
  'utils',
  'subscription',
]