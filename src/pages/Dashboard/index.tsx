import React, { useState, FormEvent, useEffect } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Title, Logo, Form, Repositories, Error } from './style'

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

      setRepositories([...repositories, repository])
      setError('')
      setNewRepo('')
    } catch (err) {
      setError('Este repositório não foi encontrado')
    }
  }

  useEffect(() => {
    localStorage.setItem(
      '@github-repository:repositories',
      JSON.stringify(repositories),
    )
  }, [repositories])

  return (
    <>
      <Logo src={logo} alt="github-explorer" />
      <Title>Explore repositórios no Github.</Title>
      <Form hasError={!!error} onSubmit={handleAddNewRepository}>
        <input
          type="text"
          placeholder="Digite aqui"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {error && <Error>{error}</Error>}

      <Repositories>
        {repositories.map(repository => {
          return (
            <Link
              key={repository.full_name}
              to={`/repositories/${repository.full_name}`}
            >
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
          )
        })}
      </Repositories>
    </>
  )
}

export default Dashboard
