/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client';

import { MyResponsiveBump } from '@/components/ResponsiveBumpNivo';
import { MonthsMapper } from '@/lib/constants';
import { type PeopleAnalyticsData } from '@/lib/definitions';
import { getPeopleAnalyticsData } from '@/services/api.service';
import { Box, Typography } from '@mui/material';
import {
  type BumpSerie,
  type BumpSerieExtraProps,
  type DefaultBumpDatum,
} from '@nivo/bump';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [headcount, setHeadcount] = useState<
    Array<BumpSerie<DefaultBumpDatum, BumpSerieExtraProps>>
  >([]);
  const [turnover, setTurnover] = useState<
    Array<BumpSerie<DefaultBumpDatum, BumpSerieExtraProps>>
  >([]);

  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getPeopleAnalyticsData(email);
        headcountMensal(result.headcountMensal);
        turnoverMensal(result.turnoverMensal);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error);
        }
      }
      setIsLoading(false);
    };

    void fetchData();

    return () => {
      source.cancel();
    };
  }, [email]);

  const headcountMensal = (headcountMensal: PeopleAnalyticsData) => {
    const headcount: DefaultBumpDatum[] = [];
    Object.keys(headcountMensal).forEach((year: string) => {
      Object.keys(headcountMensal[year]).forEach((month: string) => {
        headcount.push({
          x: `${MonthsMapper[month]}/${year}`,
          y: +headcountMensal[year][month],
        });
      });
    });
    setHeadcount([
      {
        id: 'Evolução de Headcount',
        data: headcount,
      },
    ]);
  };

  const turnoverMensal = (turnoverMensal: PeopleAnalyticsData) => {
    const turnover: DefaultBumpDatum[] = [];
    Object.keys(turnoverMensal).forEach((year: string) => {
      Object.keys(turnoverMensal[year]).forEach((month: string) => {
        turnover.push({
          x: `${MonthsMapper[month]}/${year}`,
          y: +turnoverMensal[year][month],
        });
      });
    });
    setTurnover([
      {
        id: 'Evolução de Turnover',
        data: turnover,
      },
    ]);
  };

  return (
    <>
      <Link
        href={{
          pathname: '/',
        }}
        passHref
        className="w-full"
      >
        <Typography className="text-gray-800">Voltar</Typography>
      </Link>
      <Typography>{isLoading ? 'Carregando...' : 'Dashboard'}</Typography>
      <Box className="h-[20rem]">
        <Typography color={'primary'}>Evolução de Headcount</Typography>
        <MyResponsiveBump data={headcount} />
      </Box>
      <Box className="h-[20rem]">
        <Typography color={'primary'}>Evolução de Turnover</Typography>
        <MyResponsiveBump data={turnover} />
      </Box>
    </>
  );
}

export default function Page() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </React.Suspense>
  );
}
