/**
 * ホーム画面で使用するスタイル定義ファイル
 * ホーム画面の全コンポーネントに適用されるスタイルをBEMの命名規則に従って定義
 * 各セクション（ポイント、イベント、履歴）ごとにスタイルを管理
 */

import {StyleSheet} from 'react-native';

// ホーム画面のスタイル定義
export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  points__container: {
    marginTop: 16,
    marginBottom: 8,
  },
  points__card: {
    backgroundColor: 'rgba(84, 98, 224, 0.4)',
    borderRadius: 16,
    padding: 20,
  },
  points__title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgb(234, 234, 234)',
    marginBottom: 8,
  },
  points__valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  points__value: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'rgb(234, 234, 234)',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 2, height: 4},
    textShadowRadius: 2,
  },
  points__unit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(234, 234, 234)',
    marginLeft: 4,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 2, height: 4},
    textShadowRadius: 2,
  },
  points__monthlyChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  points__monthlyLabel: {
    fontSize: 13,
    color: 'rgba(234, 234, 234, 0.7)',
  },
  points__monthlyValue: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  collapsible__header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  section__header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section__title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgb(234, 234, 234)',
    marginLeft: 8,
  },
  todayEvents__list: {
    paddingBottom: 8,
    gap: 8,
  },
  registeredEvents__list: {
    paddingBottom: 8,
    gap: 8,
  },
  event__item: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 12,
    width: 240,
  },
  event__header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  event__title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(234, 234, 234)',
    flex: 1,
    marginRight: 4,
  },
  event__points: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgb(108, 186, 162)',
  },
  event__subInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  event__time: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.7)',
  },
  event__capacity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  event__capacityText: {
    fontSize: 11,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 3,
  },
  event__location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  event__locationText: {
    fontSize: 11,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 3,
  },
  event__registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 186, 162, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  event__registeredText: {
    fontSize: 10,
    color: 'rgb(108, 186, 162)',
    marginLeft: 3,
    fontWeight: '500',
  },
  history__container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  history__tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  history__tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  history__tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(84, 98, 224)',
  },
  history__tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(234, 234, 234, 0.6)',
  },
  history__tabTextActive: {
    color: 'rgb(234, 234, 234)',
  },
  history__list: {
    padding: 16,
    maxHeight: 400,
    minHeight: 300,
    marginBottom: 16,
  },
  history__item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  history__itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  history__date: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.6)',
  },
  history__points: {
    fontSize: 14,
    fontWeight: '600',
  },
  history__title: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgb(234, 234, 234)',
    marginBottom: 4,
  },
  history__location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  history__locationText: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 2,
    marginBottom: 4,
  },
});
