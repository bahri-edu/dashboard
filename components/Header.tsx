import React from 'react'


type HeaderProps = {
    title?: string,
    children?: React.ReactNode
}

function Header({title, children}:HeaderProps) {
  return (
    <header className="bg-white shadow">
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {title? title: ""}
      </h1>
      {children}
    </div>
  </header>
  )
}

export default Header