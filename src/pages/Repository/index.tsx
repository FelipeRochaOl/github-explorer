import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import api from '../../services/api'
import logo from '../../assets/images/Logo.svg'

import { Header, Logo, RepositoryInfo, Issues } from './style'

interface RepositoryParam {
  repository: string
}

interface Repository {
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

interface Issue {
  id: number
  html_url: string
  title: string
  user: {
    login: string
  }
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParam>()
  const [issues, setIssues] = useState<Issue[]>([])
  const [repository, setRepository] = useState<Repository | null>(null)

  useEffect(() => {
    async function searchPromise() {
      try {
        const [getRepository, getIssues] = await Promise.all([
          api.get(`repos/${params.repository}`),
          api.get(`repos/${params.repository}/issues`),
        ])

        setRepository(getRepository.data)
        setIssues(getIssues.data)
      } catch (err) {
        console.log(err)
      }
    }
    searchPromise()
  }, [params.repository])
  return (
    <>
      <Header>
        <Logo src={logo} alt="github-explorer" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.full_name} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <p>Stars</p>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <p>Forks</p>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <p>Issues Abertas</p>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      {issues.map(issue => (
        <Issues key={issue.id}>
          <a href={issue.html_url} target="_blank" rel="noreferrer">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight />
          </a>
        </Issues>
      ))}
    </>
  )
}

export default Repository
