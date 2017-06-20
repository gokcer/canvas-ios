// @flow

import React, { PureComponent } from 'react'
import {
  View,
} from 'react-native'
import Screen from '../../../routing/Screen'
import i18n from 'format-message'
import RowWithSwitch from '../../../common/components/rows/RowWithSwitch'
import { connect } from 'react-redux'
import AssignmentActions from '../../assignments/actions'
import branding from '../../../common/branding'
import { SubTitle } from '../../../common/text'

type SubmissionSettingsOwnProps = {
  courseID: string,
  assignmentID: string,
  navigator: Navigator,
}
type SubmissionSettingsDataProps = {
  anonymous: boolean,
}
type SubmissionSettingsActions = {
  anonymousGrading: (string, string, boolean) => void,
}

type SubmissionSettingsProps =
  SubmissionSettingsOwnProps &
  SubmissionSettingsDataProps &
  SubmissionSettingsActions

export class SubmissionSettings extends PureComponent {
  props: SubmissionSettingsProps

  dismiss = () => {
    this.props.navigator.dismiss()
  }

  toggleAnonymousGrading = (value: boolean) => {
    this.props.anonymousGrading(
      this.props.courseID,
      this.props.assignmentID,
      value
    )
  }

  render () {
    return (
      <Screen
        title={i18n('Submission Settings')}
        navBarButtonColor={branding.primaryButtonColor}
        rightBarButtons={[{
          title: i18n('Done'),
          style: 'done',
          testID: 'submission-settings.done',
          action: this.dismiss,
        }]}
      >
        <View>
          <RowWithSwitch
            border='bottom'
            height={60}
            title={i18n('Anonymous Grading')}
            value={this.props.anonymous}
            onValueChange={this.toggleAnonymousGrading}
            identifier='submission-settings.anonymous'
          />
          <SubTitle style={{ paddingHorizontal: 12, paddingVertical: 4 }}>
            {i18n('This will anonymize each student and shuffle the submission list.')}
          </SubTitle>
        </View>
      </Screen>
    )
  }
}

export function mapStateToProps (state: AppState, ownProps: SubmissionSettingsOwnProps): SubmissionSettingsDataProps {
  let anonymous = !!state.entities.assignments[ownProps.assignmentID].anonymousGradingOn
  return { anonymous }
}
const Connect = connect(mapStateToProps, AssignmentActions)(SubmissionSettings)
export default (Connect: any)

