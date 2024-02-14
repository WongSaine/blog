import axios from 'axios'

import { store } from '../store'

const baseURL = 'https://blog.kata.academy/api/'

export class RealWorldBlogAPI {
  static async request(url: string, data: object = {}, params: object = {}, method = 'GET') {
    const headers: { [key: string]: string } = {}
    headers['X-Requested-With'] = 'XMLHttpRequest'
    headers['Content-Type'] = 'application/json'

    const user = store.getState().userReducer.user
    if (user) {
      headers['Authorization'] = `Token ${user.token}`
    }

    return await axios.request({
      baseURL,
      url,
      params,
      data,
      method,
      headers,
    })
  }

  static async fetchArticles(limit: number, offset: number, tag?: string) {
    const params: { limit: number; offset: number; tag?: string } = {
      limit,
      offset,
    }

    if (tag) {
      params.tag = tag
    }

    return await this.request('/articles', {}, params)
  }

  static async fetchArticleBySlug(slug: string) {
    return await this.request(`/articles/${slug}`)
  }

  static async createNewUser(user: { username: string; email: string; password: string }) {
    return await this.request('/users', { user }, {}, 'POST')
  }

  static async loginUser(user: { email: string; password: string }) {
    return await this.request('/users/login', { user }, {}, 'POST')
  }

  static async updateUser(user: { email: string; username: string; password?: string; image?: string }) {
    return await this.request('/user', { user }, {}, 'PUT')
  }

  static async createArticle(article: { title: string; description: string; body: string; tagList: string[] }) {
    return await this.request('/articles', { article }, {}, 'POST')
  }

  static async updateArticle(
    article: {
      title: string
      description: string
      body: string
      tagList: string[]
    },
    slug: string
  ) {
    return await this.request(`/articles/${slug}`, { article }, {}, 'PUT')
  }

  static async deleteArticle(slug: string) {
    return await this.request(`/articles/${slug}`, {}, {}, 'DELETE')
  }

  static async likeArticle(slug: string) {
    return await this.request(`/articles/${slug}/favorite`, {}, {}, 'POST')
  }

  static async unLikeArticle(slug: string) {
    return await this.request(`/articles/${slug}/favorite`, {}, {}, 'DELETE')
  }
}
