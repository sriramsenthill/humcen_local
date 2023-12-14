import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import BasicTabs from './Tabs'
import styles from '@/styles/PageTitle.module.css'
import Link from 'next/link'

function Settings({props}) {

  return (
    <>
      <div className={'card'}>
        <div className={styles.pageTitle}>
          <ul>
            <li>
              <Link href='/'>Dashboard</Link>
            </li>
            <li>Profile</li>
          </ul>
        </div>
        <Card
          sx={{
            boxShadow: 'none',
            borderRadius: '10px',
            mb: '15px',
            display: 'flex',
            p: '12px 12px',
            flexDirection: 'column',
            background: 'white'
          }}
        >
          <h1
            className={styles.heading}
            style={{
              marginTop: '14px',
              marginLeft: '16px'
            }}
          >
            Settings
          </h1>

          <BasicTabs />
        </Card>
      </div>
    </>
  )
}

export default Settings
