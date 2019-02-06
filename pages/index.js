import Link from 'next/link'

export default () => (
  <div>
    <header>
      <h1>Demos</h1>
    </header>
    <ul>
      <li>
        <Link href={{pathname: 'tic-tac-toe'}}><a>Tic Tac Toe</a></Link>
      </li>
      <li>
        <Link href={{pathname: 'about'}}><a>About</a></Link>
      </li>
      <li>
        <Link href={{pathname: 'contact'}}><a>Contact Us</a></Link>
      </li>
    </ul>
  </div>
)
