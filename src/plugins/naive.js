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
    NaiveUI.NAvatar,
    NaiveUI.NTabs,
    NaiveUI.NTabPane,
    NaiveUI.NForm,
    NaiveUI.NFormItem,
    NaiveUI.NInput,
    NaiveUI.NCheckbox,
    NaiveUI.NDivider,
    NaiveUI.NSpace
],
});
export function setupNaive(app) {
  app.use(naive);
}