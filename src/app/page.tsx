'use client';

import styles from '@/ui/home.module.scss';
import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Paper, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Box className={styles.home}>
      <Paper elevation={3} className="h-[30em] w-[23em]">
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          className="h-full p-8"
          gap={2}
        >
          <AccountCircle
            sx={{ fontSize: 80 }}
            color={'primary'}
            className="mt-[-1.5em]"
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={handleEmailChange}
            className="w-full"
          />
          <Link
            href={{
              pathname: `/dashboard`,
              query: {
                email,
              },
            }}
            passHref
            className="w-full"
          >
            <Button variant="contained" color={'primary'} className="w-full">
              Pesquisar
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
}
