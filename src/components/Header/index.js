import React from 'react'
import { Button, Dropdown, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons'
import Link from 'next/link'

const items = [
    {
      key: '1',
      label: (
        <Link href="/">
          Basic
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href="/interest">
          Interest
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href="/loan">
          Loan
        </Link>
      ),
    },
]

const Header = () => {
  return (
    <div className='header'>
        <div className='header-logo'>
            Calculator
        </div>
        <div className='header-menu'>
            <Dropdown
                menu={{
                    items
                }}
            >
                <Button><MenuOutlined /></Button>
            </Dropdown>
        </div>
    </div>
  )
}

export default Header