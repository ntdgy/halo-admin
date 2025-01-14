import Vue from 'vue'
import { OPTIONS } from '@/store/mutation-types'
import apiClient from '@/utils/api-client'

const keys = [
  'blog_url',
  'developer_mode',
  'attachment_upload_image_preview_enable',
  'attachment_upload_max_parallel_uploads',
  'attachment_upload_max_files',
  'sheet_prefix',
  'post_permalink_type',
  'sheet_permalink_type',
  'archives_prefix',
  'path_suffix',
  'default_editor',
  'default_menu_team'
]
const option = {
  state: {
    options: undefined
  },
  mutations: {
    SET_OPTIONS: (state, options) => {
      Vue.ls.set(OPTIONS, options)
      state.options = options
    }
  },
  actions: {
    refreshOptionsCache({ commit }) {
      return new Promise((resolve, reject) => {
        apiClient.option
          .listAsMapViewByKeys(keys)
          .then(response => {
            commit('SET_OPTIONS', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default option
