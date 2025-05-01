/**
 * イベントフォームのスタイル定義
 * EventFormコンポーネントで使用されるスタイルを提供する
 */

import {StyleSheet} from 'react-native';

// 入力フィールドの共通の高さ
const INPUT_HEIGHT = 48;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgb(36, 37, 41)',
  },
  formGroup: {
    marginBottom: 8,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  formGroupHalf: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
    color: 'rgb(234, 234, 234)',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    padding: 8,
    color: 'rgb(234, 234, 234)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    height: INPUT_HEIGHT,
  },
  textArea: {
    minHeight: 100,
    height: 'auto',
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    height: INPUT_HEIGHT,
    justifyContent: 'center',
  },
  picker: {
    color: 'rgb(234, 234, 234)',
    backgroundColor: 'transparent',
  },
  dateTimeContainer: {
    flexDirection: 'row',
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    height: INPUT_HEIGHT,
  },
  dateTimeText: {
    color: 'rgb(234, 234, 234)',
    marginLeft: 8,
  },
  placeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    height: INPUT_HEIGHT,
  },
  placeText: {
    color: 'rgb(234, 234, 234)',
    marginLeft: 8,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 40,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    marginRight: 10,
  },
  cancelButtonText: {
    color: 'rgb(234, 234, 234)',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgb(84, 98, 224)',
    borderRadius: 6,
  },
  submitButtonText: {
    color: 'rgb(234, 234, 234)',
    fontSize: 14,
    fontWeight: '500',
  },
  // 繰り返し設定UI用のスタイル
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    paddingBottom: 4,
    marginLeft: 8,
    color: 'rgb(234, 234, 234)',
    fontSize: 14,
  },
  repeatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(84, 98, 224, 0.2)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 12,
  },
  repeatBadgeText: {
    color: 'rgb(234, 234, 234)',
    fontSize: 12,
    marginRight: 4,
    paddingBottom: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  repeatDialogContainer: {
    width: '100%',
    backgroundColor: 'rgb(36, 37, 41)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  repeatDialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  repeatDialogTitle: {
    color: 'rgb(234, 234, 234)',
    fontSize: 18,
    fontWeight: '500',
  },
  repeatDialogContent: {
    padding: 16,
  },
  repeatDialogButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
