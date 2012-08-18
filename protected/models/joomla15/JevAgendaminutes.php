<?php

/**
 * This is the model class for table "jos_jev_agendaminutes".
 *
 * The followings are the available columns in table 'jos_jev_agendaminutes':
 * @property integer $minutes_id
 * @property integer $agenda_id
 * @property integer $evdet_id
 */
class JevAgendaminutes extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return JevAgendaminutes the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'jos_jev_agendaminutes';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('minutes_id, agenda_id, evdet_id', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('minutes_id, agenda_id, evdet_id', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'minutes_id' => 'Minutes',
			'agenda_id' => 'Agenda',
			'evdet_id' => 'Evdet',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('minutes_id',$this->minutes_id);
		$criteria->compare('agenda_id',$this->agenda_id);
		$criteria->compare('evdet_id',$this->evdet_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}