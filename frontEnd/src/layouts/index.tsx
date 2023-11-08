import { Box, Container, Grid, Hidden, Typography, styled } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.blue2};
`
)

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
)

const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.black[100]};
`
)

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.black[100]};
`
)

const BaseLayout: React.FC = () => {
  return (
    <Box
      sx={{
        flex: 1,
        height: '100%'
      }}
    >
      <MainContent>
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems='stretch'
          spacing={0}
        >
          <Hidden mdDown>
            <GridWrapper
              xs={12}
              md={4}
              alignItems='center'
              display='flex'
              justifyContent='center'
              item
            >
              <Container maxWidth='sm'>
                <Box textAlign='center'>
                  <img
                    alt='500'
                    height={50}
                    src='https://www.developer.tech.gov.sg/assets/img/logo_color.svg'
                  />
                </Box>
                <Box textAlign='center'>
                  <TypographyPrimary variant='h3' sx={{ my: 1 }}>
                    Transform with the Singapore Government Developer Portal
                  </TypographyPrimary>
                  <TypographySecondary
                    variant='h4'
                    fontWeight='normal'
                    sx={{ mb: 4 }}
                  >
                    The Singapore Government Developer Portal (Dev Portal)
                    offers public officers, government business partners, and
                    tech community members key resources that support their
                    digital transformation efforts.
                  </TypographySecondary>
                </Box>
              </Container>
            </GridWrapper>
          </Hidden>
          <Grid
            xs={12}
            md={8}
            mt={5}
            display='flex'
            justifyContent='center'
            item
          >
            <Outlet />
          </Grid>
        </Grid>
      </MainContent>
    </Box>
  )
}

export default BaseLayout
