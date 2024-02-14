import { useFieldArray } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import { useAppDispatch, useFormHandler } from '../../hooks'
import InputField from '../InputField'
import { createArticle, fetchArticleBySlug, updateArticle } from '../../store/articles/articlesActions.ts'
import Form from '../Form'
import Textarea from '../Textarea'
import { IArticle } from '../../models/IArticle.ts'

import classes from './ArticleFormPage.module.scss'

interface IFormInput {
  title: string
  description: string
  body: string
  tagList: { value: string }[]
}

const ArticleFormPage = () => {
  const [values, setValues] = useState<IFormInput | undefined>(undefined)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (params.slug) {
      dispatch(fetchArticleBySlug(params.slug)).then((action) => {
        if (action.type === 'rejected') {
          navigate(`/${action.payload.status}`)
          return
        }
        setValues({
          title: action.payload.title,
          description: action.payload.description,
          body: action.payload.body,
          tagList: action.payload.tagList.map((tag: string) => ({ value: tag })),
        })
      })
    }
  }, [])

  const callback = values ? updateArticle : createArticle
  const formCallback = async (data: IFormInput, event: React.BaseSyntheticEvent | undefined) => {
    event?.preventDefault()
    const fetchData = values ? { article: data, slug: params.slug } : data
    //@ts-ignore
    await dispatch(callback(fetchData)).then((action) => {
      console.log(action)
      navigate(`/articles/${(action.payload as IArticle).slug}`)
    })
  }

  const { register, errors, formHandler, isValid, control } = useFormHandler<IFormInput>(formCallback, values)

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  return (
    <div className={classes.articlePage}>
      <Form onSubmit={formHandler} isValid={isValid} title="Create new article" buttonText="Send">
        <InputField
          register={register}
          rules={{
            required: 'Field is required',
          }}
          errors={errors.errors?.filter((err) => err.key === 'title')}
          name={'title'}
          label={'Title'}
          placeholder={'Title'}
          autofocus
        />
        <InputField
          register={register}
          rules={{
            required: 'Field is required',
          }}
          errors={errors.errors?.filter((err) => err.key === 'description')}
          name={'description'}
          label={'Short description'}
          placeholder={'Short description'}
        />
        <Textarea
          name="body"
          label="Text"
          placeholder="Text"
          register={register}
          errors={errors.errors?.filter((err) => err.key === 'body')}
          rules={{
            required: 'Field is required',
          }}
        ></Textarea>

        <p className={classes.articlePage__tagsLabel}>Tags</p>
        <div className={classes.articlePage__tags}>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className={classes.articlePage__tagRow}>
                <InputField
                  name={`tagList.${index}.value`}
                  rules={{}}
                  register={register}
                  placeholder="Tag"
                  className={classes.articlePage__tagInput}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={[classes.articlePage__btn, classes.articlePage__btnDelete].join(' ')}
                >
                  Delete
                </button>
              </div>
            )
          })}
          <button
            type="button"
            onClick={() => append({ value: '' })}
            className={[classes.articlePage__btn, classes.articlePage__btnAdd].join(' ')}
          >
            Add tag
          </button>
        </div>
      </Form>
    </div>
  )
}

export default ArticleFormPage
