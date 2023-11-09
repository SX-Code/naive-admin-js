import * as NaiveUI from 'naive-ui';

const naive = NaiveUI.create({
  components: [
    NaiveUI.NMessageProvider,
    NaiveUI.NDialogProvider,
    NaiveUI.NConfigProvider,
    NaiveUI.NButton,
    NaiveUI.NIcon,
    NaiveUI.NLayoutSider,
    NaiveUI.NDrawer,
    NaiveUI.NLayoutHeader,
    NaiveUI.NLayoutContent,
    NaiveUI.NBackTop,
    NaiveUI.NLayout,
    NaiveUI.NMenu,
    NaiveUI.NDropdown,
    NaiveUI.NBreadcrumbItem,
    NaiveUI.NBreadcrumb,
    NaiveUI.NTooltip,
    NaiveUI.NAvatar
],
});
export function setupNaive(app) {
  app.use(naive);
}