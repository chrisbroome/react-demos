import Link from 'next/link'

const pages = [
  {
    pathname: 'tic-tac-toe',
    linkText: 'Tic Tac Toe'
  },
  {
    pathname: 'todos',
    linkText: 'To-do List'
  },
  {
    pathname: 'about',
    linkText: 'About'
  },
  {
    pathname: 'contact',
    linkText: 'Contact'
  },
]

const DemoLinks = ({pages}) => (
  <ul>
    {pages.map(({pathname, linkText}, index) =>
      <li key={index}>
        <Link prefetch href={{pathname}}><a>{linkText}</a></Link>
      </li>
    )}
  </ul>
)

const IndexPage = () => (
  <div>
    <header>
      <h1>Demos</h1>
    </header>
    <DemoLinks pages={pages} />
  </div>
)

export default IndexPage
