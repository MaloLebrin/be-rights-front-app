import fs from 'fs'

export const EXCLUDES_STORE_FOLDER_NAME = [
  'utils',
  'subscription',
  'index.ts',
]

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

export const getStoreFileNames = () => {
  const STORE_PATH = './src/store'

  return fs.readdirSync(STORE_PATH)
    .filter(folder => !EXCLUDES_STORE_FOLDER_NAME.includes(folder))
    .reduce((acc, folder) => {
      return {
        ...acc,
        [folder]: getFileNames(`${STORE_PATH}/${folder}`).filter(name => name !== 'state' && name !== 'types'),
      }
    }, {})
}
