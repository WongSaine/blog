import { RealWorldBlogAPI } from './realWorldBlogAPI.ts'
import { loadFromStorage, setToStorage } from './localStorageServicce.ts'
import { prepareFetchError } from './prepareFetchError.ts'

export { RealWorldBlogAPI as BlogAPI, setToStorage, loadFromStorage, prepareFetchError }
