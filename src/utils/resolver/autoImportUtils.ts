import fs from 'fs'

const STORE_PATH = '../../store'
const HOOKS_PATH = '../../hooks'


export const getFileNames = (dir: string) => fs.readdirSync(dir)
  .map(file => {
    return file.split('.ts')[0]
  })

export function getDirectoryAuthImportPaths(dir: string): Record<string, string> {
  return getFileNames(dir).reduce((acc, name) => ({
    ...acc,
    [name]: `${dir}/${name}`,
  }), {})
}

