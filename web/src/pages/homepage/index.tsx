import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomLink from "../../common/components/custom-link";
import { APP_URLS } from "../../router";
import EnterButton from "./components/enter-button";
import Footer from "./components/footer";
import Section from "./components/section";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack sx={{ overflowY: "auto" }} divider={<Divider />}>
        <Stack
          sx={{
            height: "100vh",
            flexShrink: 0,
            position: "relative",
            zIndex: 10,
            background: "#FFF",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2">Linkme</Typography>
          <Typography>一个简单的用户内容分享平台</Typography>
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => navigate(APP_URLS.LOGIN_PAGE_URL)}
          >
            <Typography variant="h6">开始使用</Typography>
          </Button>
        </Stack>
        <Section>
          <Container maxWidth="md">
            <Typography variant="h4">目标</Typography>
            <Typography sx={{ mt: 2 }}>
              构建一个以即时通讯为中心的一站式用户内容分享平台。
            </Typography>
          </Container>
        </Section>
        <Section>
          <Container maxWidth="md">
            <Typography variant="h4">早期测试阶段！</Typography>
            <Typography sx={{ mt: 2 }}>
              当前版本仍处于早期测试阶段，功能尚不完善，并且在使用过程中可能出现预期之外的错误。
            </Typography>
          </Container>
        </Section>
        <Section>
          <Container maxWidth="md">
            <Typography variant="h4">未来将实现的功能</Typography>
            <Stack sx={{ mt: 2 }} spacing={1}>
              <Typography variant="body1">
                在目前的计划中，Linkme未来将要实现的功能主要有以下几个：
              </Typography>
              <Stack component="ul" spacing={1}>
                <li>即时通讯</li>
                <li>视频平台</li>
                <li>协同文档</li>
                <li>待办事项</li>
              </Stack>
              <Typography>
                外部用户可以通过访问指定用户分享的上述信息，来获取用户的工作进展和内容产出。
              </Typography>
              <Typography>
                在内容的生产者和消费者之间构建一个足够完整的平台，来帮助生产者和消费者之间进行更好的交流，这正是Linkme正在做的事情。
              </Typography>
            </Stack>
          </Container>
        </Section>
        <Section>
          <Container maxWidth="md">
            <Typography variant="h4">应用迭代</Typography>
            <Stack sx={{ mt: 2 }} spacing={1}>
              <Typography>
                对于一个Web
                App来说，有规律的版本迭代有助于平衡App的生命力和开发者的生命力。
              </Typography>
              <Typography>
                目前我所计划的迭代方式是以两周为一个周期，有序的去编排每个版本应当上线的具体需求点。
              </Typography>
              <Typography>
                相关的需求文档可以在该地址中进行查阅：
                <CustomLink
                  href="https://github.com/sheason2019/linkme/tree/mvp/doc"
                  target="_blank"
                >
                  GitHub Link
                </CustomLink>
                。
              </Typography>
              <Typography>
                <span>
                  由于文档的内容不宜太过散乱，所以目前的文档我基本只用来记录一些相对重要的需求点，
                </span>
                <span>
                  而一些更细致的任务内容，我则是使用MicroSoft
                  ToDo在进行记录，未来等到待办事项功能开发完毕后，
                </span>
                <span>
                  我会尝试把自己的工作进展迁移到平台上，这样就可以很方便的实时展示自己的工作进展。
                </span>
              </Typography>
            </Stack>
          </Container>
        </Section>
        <Footer />
      </Stack>
      <EnterButton />
    </>
  );
};

export default HomePage;
