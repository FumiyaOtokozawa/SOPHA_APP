/**
 * イベント詳細画面のスタイル定義
 * イベント詳細表示に必要なスタイルを提供
 */

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(36, 37, 41)',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerImage: {
    width: '100%',
    height: 180,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 130,
    height: 50,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(36, 37, 41, 0.7)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(234, 234, 234)',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  genreTag: {
    backgroundColor: 'rgba(84, 98, 224, 0.2)',
  },
  formatTag: {
    backgroundColor: 'rgba(108, 186, 162, 0.2)',
  },
  tagText: {
    fontSize: 11,
    color: 'rgb(234, 234, 234)',
    fontWeight: '500',
  },
  genreTagText: {
    color: 'rgb(84, 98, 224)',
  },
  formatTagText: {
    color: 'rgb(108, 186, 162)',
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  favoriteCount: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.8)',
    marginLeft: 4,
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgb(234, 234, 234)',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  infoIcon: {
    width: 24,
    marginRight: 12,
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.6)',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: 'rgb(234, 234, 234)',
  },
  infoValueSmall: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.9)',
  },
  descriptionSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgb(234, 234, 234)',
  },
  metaSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  metaInfo: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.5)',
    marginBottom: 4,
  },
  actionButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(36, 37, 41, 0.98)',
  },
  actionButton: {
    backgroundColor: 'rgb(84, 98, 224)',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'rgb(234, 234, 234)',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: 'rgb(84, 98, 224)',
  },
  cancelButton: {
    backgroundColor: 'rgb(225, 102, 108)',
  },
  disabledButton: {
    backgroundColor: 'rgba(84, 98, 224, 0.4)',
  },
  urlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(84, 98, 224, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  urlButtonText: {
    color: 'rgb(84, 98, 224)',
    fontSize: 13,
    marginLeft: 6,
  },
  memberList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  memberChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  memberAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(84, 98, 224, 0.3)',
    marginRight: 4,
  },
  memberName: {
    fontSize: 12,
    color: 'rgb(234, 234, 234)',
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(84, 98, 224, 0.3)',
    marginRight: 8,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 14,
    color: 'rgb(234, 234, 234)',
    fontWeight: '500',
  },
  ownerLabel: {
    fontSize: 11,
    color: 'rgba(234, 234, 234, 0.6)',
  },
});
