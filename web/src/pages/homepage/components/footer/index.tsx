import { Box, Container, Grid, Stack } from "@mui/material";
import CustomLink from "../../../../common/components/custom-link";

const Footer = () => {
  return (
    <Box
      sx={{
        minHeight: 140,
        fontSize: "0.85rem",
        backgroundColor: "whitesmoke",
      }}
    >
      <Container maxWidth="md" sx={{ backgroundColor: "whitesmoke" }}>
        <Grid container height="100%" sx={{ py: 4 }} rowGap={2}>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center">
              <Box sx={{ mb: 1 }}>互联网ICP备案</Box>
              <CustomLink href="https://beian.miit.gov.cn/" target="_blank">
                鄂ICP备2022018386号-1
              </CustomLink>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center">
              <Box sx={{ mb: 1 }}>联系方式</Box>
              <Stack direction="row" spacing={1}>
                <Box component="span">GitHub</Box>
                <CustomLink
                  href="https://github.com/sheason2019"
                  target="_blank"
                >
                  Sheason2019
                </CustomLink>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Box component="span">Email</Box>
                <Box component="span">811627877@qq.com</Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center">
              <Box sx={{ mb: 1 }}>项目地址</Box>
              <CustomLink
                href="https://github.com/sheason2019/linkme"
                target="_blank"
              >
                Sheason2019/linkme
              </CustomLink>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
