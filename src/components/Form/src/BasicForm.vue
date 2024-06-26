<template>
  <n-form v-bind="getBindValue" :model="formModel" ref="formElRef">
    <n-grid v-bind="getGrid">
      <n-gi
        v-bind="schema.giProps"
        v-for="schema in getSchema"
        :key="schema.field"
      >
        <n-form-item :label="schema.label" :path="schema.field">
          <!--标签名右侧温馨提示-->
          <template #label v-if="schema.labelMessage">
            {{ schema.label }}
            <n-tooltip trigger="hover" :style="schema.labelMessageStyle">
              <template #trigger>
                <n-icon size="18" class="cursor-pointer text-gray-400">
                  <QuestionCircleOutlined />
                </n-icon>
              </template>
              {{ schema.labelMessage }}
            </n-tooltip>
          </template>

          <!-- 判断插槽 -->
          <template v-if="schema.slot">
            <slot
              :name="schema.slot"
              :model="formModel"
              :field="schema.field"
              :value="formModel[schema.field]"
            ></slot>
          </template>

          <!-- NCheckbox -->
          <template v-else-if="schema.component === 'NCheckbox'">
            <n-checkbox-group v-model:value="formModel[schema.field]" v-bind="getComponentProps(schema)">
              <n-space>
                <n-checkbox
                  v-for="item in schema.componentProps.options"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </n-space>
            </n-checkbox-group>
          </template>
          <!--NRadioGroup-->
          <template v-else-if="schema.component === 'NRadioGroup'">
            <n-radio-group v-model:value="formModel[schema.field]" v-bind="getComponentProps(schema)">
              <n-space>
                <n-radio
                  v-for="item in schema.componentProps.options"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </template>
          <!-- 动态渲染表单组件 -->
          <component
            v-else
            v-bind="getComponentProps(schema)"
            :is="schema.component"
            v-model:value="formModel[schema.field]"
            :class="{ isFull: schema.isFull != false && getProps.isFull }"
          />
          <!-- 组件后面的内容 -->
          <template v-if="schema.suffix">
            <slot
              :name="schem.suffix"
              :model="formModel"
              :field="schem.field"
              :value="formModel[schem.field]"
            ></slot>
          </template>
        </n-form-item>
      </n-gi>
      <!-- 提交 重置 展开 收起 按钮 -->
      <n-gi
        :span="isInline ? '' : 24"
        :suffix="isInline ? true : false"
        #="{ overflow }"
        v-if="getProps.showActionButtonGroup"
      >
        <n-space
          align="center"
          :justify="isInline ? 'end' : 'start'"
          :style="{
            'margin-left': `${isInline ? 12 : getProps.labelWidth}px`,
          }"
        >
          <n-button
            v-if="getProps.showSubmitButton"
            v-bind="getSubmitBtnOptions"
            @click="handleSubmit"
            :loading="loadingSub"
            secondary
            >{{ getProps.submitButtonText }}</n-button
          >
          <n-button
            v-if="getProps.showResetButton"
            v-bind="getResetBtnOptions"
            @click="resetFields"
            >{{ getProps.resetButtonText }}</n-button
          >
          <n-button
            type="primary"
            text
            icon-placement="right"
            v-if="isInline && getProps.showAdvancedButton"
            @click="unfoldToggle"
          >
            <template #icon>
              <n-icon size="14" class="unfold-icon" v-if="overflow">
                <DownOutlined />
              </n-icon>
              <n-icon size="14" class="unfold-icon" v-else>
                <UpOutlined />
              </n-icon>
            </template>
            {{ overflow ? '展开' : '收起' }}
          </n-button>
        </n-space>
      </n-gi>
    </n-grid>
  </n-form>
</template>
<script>
import { isArray } from 'lodash-es';
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  unref,
  watch,
} from 'vue';
import { basicProps } from './props';
import { DownOutlined, UpOutlined, QuestionCircleOutlined } from '@vicons/antd';
import { createPlaceholderMessage } from './helper';
import { useFormEvents } from './hooks/useFormEvent';
import { useFormValues } from './hooks/useFormValues';
import { deepMerge } from '@/utils';

export default defineComponent({
  name: 'BasicUpload',
  components: { DownOutlined, UpOutlined, QuestionCircleOutlined },
  props: {
    ...basicProps,
  },
  emits: ['reset', 'submit', 'register'],
  setup(props, { emit, attrs }) {
    const defaultFormModel = ref({});
    const formModel = reactive({});
    const propsRef = ref({});
    const schemaRef = ref(null);
    const formElRef = ref(null);
    const gridCollapsed = ref(true);
    const loadingSub = ref(false);
    const isUpdateDefaultRef = ref(false);
    const getSubmitBtnOptions = computed(() => {
      return Object.assign(
        {
          size: props.size,
          type: 'primary',
        },
        props.submitButtonOptions
      );
    });

    const getResetBtnOptions = computed(() => {
      return Object.assign(
        {
          size: props.size,
          type: 'default',
        },
        props.resetButtonOptions
      );
    });

    function getComponentProps(schema) {
      const compProps = schema.componentProps ?? {};
      const component = schema.component;
      return {
        clearable: true,
        placeholder: createPlaceholderMessage(unref(component)),
        ...compProps,
      };
    }

    const getProps = computed(() => {
      const formProps = { ...props, ...unref(propsRef) };
      const rulesObj = {
        rules: {},
      };
      const schemas = formProps.schemas || [];
      schemas.forEach((item) => {
        if (item.rules && isArray(item.rules)) {
          rulesObj.rules[item.field] = item.rules;
        }
      });
      return { ...formProps, ...unref(rulesObj) };
    });

    const isInline = computed(() => {
      const { layout } = unref(getProps);
      return layout === 'inline';
    });

    const getGrid = computed(() => {
      const { gridProps } = unref(getProps);
      return {
        ...gridProps,
        collapsed: isInline.value ? gridCollapsed.value : false,
        responsive: 'screen',
      };
    });

    const getBindValue = computed(() => ({
      ...attrs,
      ...props,
      ...unref(getProps),
    }));

    const getSchema = computed(() => {
      const schemas = unref(schemaRef) || getProps.value.schemas;
      for (const schema of schemas) {
        const { defaultValue } = schema;
        // handle date type
        // dateItemType.includes(component as string)
        if (defaultValue) {
          schema.defaultValue = defaultValue;
        }
      }
      return schemas;
    });

    const { handleFormValues, initDefault } = useFormValues({
      defaultFormModel,
      getSchema,
      formModel,
    });
    const {
      handleSubmit,
      validate,
      resetFields,
      getFieldsValue,
      clearValidate,
      setFieldsValue,
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      formElRef: formElRef,
      defaultFormModel,
      loadingSub,
      handleFormValues,
    });

    function unfoldToggle() {
      gridCollapsed.value = !gridCollapsed.value;
    }

    async function setProps(formProps) {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
    }

    const formActionType = {
      getFieldsValue,
      setFieldsValue,
      resetFields,
      validate,
      clearValidate,
      setProps,
      submit: handleSubmit,
    };

    watch(
      () => getSchema.value,
      (schema) => {
        if (unref(isUpdateDefaultRef)) {
          return;
        }
        if (schema?.length) {
          initDefault();
          isUpdateDefaultRef.value = true;
        }
      }
    );

    onMounted(() => {
      initDefault();
      // 执行提供的注册函数，useForm方式
      emit('register', formActionType);
    });

    return {
      formElRef,
      formModel,
      getGrid,
      getProps,
      getBindValue,
      getSchema,
      getSubmitBtnOptions,
      getResetBtnOptions,
      handleSubmit,
      resetFields,
      loadingSub,
      isInline,
      getComponentProps,
      unfoldToggle,
    };
  },
});
</script>
<style lang="less" scoped>
.isFull {
  width: 100%;
  justify-content: flex-start;
}

.unfold-icon {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: -3px;
}
</style>
