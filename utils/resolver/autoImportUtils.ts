import fs from 'fs'

export const EXCLUDES_STORE_FOLDER_NAME = [
  'utils',
  'subscription',
  'index.ts',
]
export const STORE_PATH = './store'


export const getFileNames = (dir: string) => fs.readdirSync(dir)
  .map(file => {
    return file.split('.ts')[0]
  })

export function getDirectoryAuthImportPaths(dir: string): Record<string, string> {
  if (dir === STORE_PATH) {
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

  return fs.readdirSync(STORE_PATH)
    .filter(folder => !EXCLUDES_STORE_FOLDER_NAME.includes(folder))
    .reduce((acc, folder) => {
      return {
        ...acc,
        [folder]: getFileNames(`${STORE_PATH}/${folder}`).filter(name => name !== 'state' && name !== 'types'),
      }
    }, {})
}
