import Nerv from "nervjs";
import dayjs from 'dayjs';
import classnames from 'classnames';
import Taro from "@tarojs/taro-h5";
import { Text, View, Picker } from '@tarojs/components';
export default class AtCalendarController extends Taro.Component {
  render() {
    const { generateDate, minDate, maxDate, monthFormat, hideArrow } = this.props;
    const dayjsDate = dayjs(generateDate);
    const dayjsMinDate = !!minDate && dayjs(minDate);
    const dayjsMaxDate = !!maxDate && dayjs(maxDate);
    const isMinMonth = dayjsMinDate && dayjsMinDate.startOf('month').isSame(dayjsDate);
    const isMaxMonth = dayjsMaxDate && dayjsMaxDate.startOf('month').isSame(dayjsDate);
    const minDateValue = dayjsMinDate ? dayjsMinDate.format('YYYY-MM') : '';
    const maxDateValue = dayjsMaxDate ? dayjsMaxDate.format('YYYY-MM') : '';
    return <View className="at-calendar__controller controller">
        {hideArrow ? null : <View className={classnames('controller__arrow controller__arrow--left', {
        'controller__arrow--disabled': isMinMonth
      })} onClick={this.props.onPreMonth.bind(this, isMinMonth)} />}
        <Picker mode="date" fields="month" end={maxDateValue} start={minDateValue} onChange={this.props.onSelectDate} value={dayjsDate.format('YYYY-MM')}>
          <Text className="controller__info">
            {dayjsDate.format(monthFormat)}
          </Text>
        </Picker>
        {hideArrow ? null : <View className={classnames('controller__arrow controller__arrow--right', {
        'controller__arrow--disabled': isMaxMonth
      })} onClick={this.props.onNextMonth.bind(this, isMaxMonth)} />}
      </View>;
  }
}
AtCalendarController.options = { addGlobalClass: true };