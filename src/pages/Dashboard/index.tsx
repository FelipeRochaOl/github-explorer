import React, { useState, FormEvent, useEffect, KeyboardEvent } from 'react'
import { FiChevronRight, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Title, Logo, Form, Repositories, Error, Filter } from './style'

import logo from '../../assets/images/Logo.svg'
import api from '../../services/api'

interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<string | null>(null)
  const [filterRepositories, setFilterRepositories] = useState<Repository[]>([])
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const localStorageRepositories = localStorage.getItem(
      '@github-repository:repositories',
    )
    if (localStorageRepositories) {
      return JSON.parse(localStorageRepositories)
    }
    return []
  })

  async function handleAddNewRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    if (!newRepo) {
      setError('Preencha o campo com autor/repositório antes de pesquisar')
      return
    }
    try {
      const response = await api.get<Repository>(`repos/${newRepo}`)
      const repository = response.data
      const find = repositories.filter(filterRepo =>
        filterRepo.full_name.includes(repository.full_name),
      )
      if (find.length) {
        setError('Este repositório já esta cadastrado')
        return
      }
      setRepositories([...repositories, repository])
      setError('')
      setNewRepo('')
    } catch (err) {
      setError('Este repositório não foi encontrado')
    }
  }

  async function handleFilter(
    event: KeyboardEvent<HTMLInputElement>,
  ): Promise<void> {
    if (event.code === 'Enter' && filter) {
      const find = repositories.filter(repository =>
        repository.full_name.includes(filter),
      )
      setFilterRepositories(find)
      setFilter('')
      return
    }
    setFilterRepositories([])
    setFilter('')
  }

  const handleDelete = (name: string) => {
    const changeRepository = repositories.filter(
      repository => repository.full_name !== name,
    )
    setRepositories(changeRepository)
  }

  useEffect(() => {
    setFilterRepositories([])
  }, [])

  useEffect(() => {
    localStorage.setItem(
      '@github-repository:repositories',
      JSON.stringify(repositories),
    )
  }, [repositories])

  const repos = filterRepositories.length ? filterRepositories : repositories

  return (
    <>
      <Logo src={logo} alt="github-explorer" />
      <Title>Explore repositories in Github.</Title>
      <Form hasError={!!error} onSubmit={handleAddNewRepository}>
        <input
          type="text"
          placeholder="Type here..."
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <button type="submit">Search</button>
      </Form>
      {error && <Error>{error}</Error>}
      <Filter>
        <input
          type="text"
          placeholder="Search"
          onChange={e => setFilter(e.target.value)}
          onKeyPress={e => handleFilter(e)}
        />
      </Filter>
      <Repositories>
        {repos.map(repository => {
          return (
            <section key={repository.full_name}>
              <Link to={`/repositories/${repository.full_name}`}>
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.full_name}
                />
                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>
                <FiChevronRight />
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(repository.full_name)}
              >
                <FiTrash2 />
              </button>
            </section>
          )
        })}
      </Repositories>
    </>
  )
}

export default Dashboard
